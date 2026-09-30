using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NICE.Identity.Authentication.Sdk.Configuration;
using NICE.Identity.Authentication.Sdk.Extensions;
using NICE.Identity.Management.Configuration;
using NICE.Identity.Management.Controllers;
using NICE.Identity.Management.Extensions;
using ProxyKit;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IAuthenticationService = NICE.Identity.Authentication.Sdk.Authentication.IAuthenticationService;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace NICE.Identity.Management
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }
        private const string AdministratorRole = "Administrator";
        private const string CorsPolicyName = "CorsPolicy";
        public static string AccessKeyForLocalDevelopmentUse;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            AppSettings.Configure(services, Configuration, Environment.IsDevelopment() ? @"c:\" : Environment.ContentRootPath);
            services
                .AddReverseProxy()
                .LoadFromConfig(
                    Configuration.GetSection("FrontendProxy"));

            //dependency injection goes here.
            services.AddHttpContextAccessor();
            services.AddTransient<HealthCheckDelegatingHandler>();

            // TODO: remove httpClientBuilder
            // This bypasses any certificate validation on proxy requests
            // Only done due to local APIs not having certificates configured 
            services.AddProxy(httpClientBuilder => httpClientBuilder.ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) => true
            }));
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddControllersWithViews();
            services.AddRazorPages();

            // Add authentication services
            var authConfiguration = new AuthConfiguration(Configuration, "WebAppConfiguration");
            services.AddAuthentication(authConfiguration, allowNonSecureCookie: Environment.IsDevelopment());
            services.AddAuthorisation(authConfiguration);

            services.AddHealthChecks();
            services.AddHealthChecksUI(setupSettings: setup =>
            {
                setup.UseApiEndpointDelegatingHandler<HealthCheckDelegatingHandler>();
            })
                .AddInMemoryStorage();

            services.AddCors(options =>
            {
                options.AddPolicy(CorsPolicyName,
                    builder => builder.WithOrigins(AppSettings.EnvironmentConfig.CorsOrigin, "http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor |
                    ForwardedHeaders.XForwardedProto |
                    ForwardedHeaders.XForwardedHost;

                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            services.AddOptions();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        [Obsolete] //obselete added as proxykit marked the runproxy as deprecated. we should switch to https://github.com/microsoft/reverse-proxy when it's released though. - currently it's just a release candidate.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, ILogger<Startup> startupLogger,
            IHostApplicationLifetime appLifetime, IAuthenticationService niceAuthenticationService, IHttpContextAccessor httpContextAccessor)
        {
            startupLogger.LogInformation("Identity management is starting up");

            app.UseForwardedHeaders();

            app.Use(async (context, next) =>
            {
                context.Request.Scheme = "https";

                context.Response.OnStarting(() =>
                {
                    context.Response.Headers.Add("Permissions-Policy", "interest-cohort=()");

                    return Task.FromResult(0);
                });
                await next();
            }
            );

            app.UseHttpsRedirection();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseStatusCodePagesWithReExecute("/error/{0}"); // url to errorcontroller
            }

            app.UseCors(CorsPolicyName);

            app.RunProxy("/api", async context =>
            {
                var apiEndpoint = Configuration.GetSection("WebAppConfiguration")["AuthorisationServiceUri"];
                apiEndpoint += apiEndpoint.EndsWith("/") ? "api" : "/api";
                startupLogger.LogDebug($"Proxy to endpoint {apiEndpoint}");
                var forwardContext = context
                    .ForwardTo(apiEndpoint)
                    .CopyXForwardedHeaders()
                    .AddXForwardedHeaders();
                // TODO: Add token expiration handling
                startupLogger.LogDebug("Proxy call started");
                if (!forwardContext.UpstreamRequest.Headers.Contains("Authorization"))
                {
                    startupLogger.LogDebug("Proxy Add Authorization");
                    var accessToken = await httpContextAccessor.HttpContext.GetTokenAsync("access_token");

#if DEBUG
                    if (env.IsDevelopment())
                    {
                        AccessKeyForLocalDevelopmentUse ??= accessToken; //this is a hack to enable the front-end to share the access token with the backend. local dev only. it'd be a major security flaw elsewhere.
                        accessToken ??= AccessKeyForLocalDevelopmentUse;
                    }
#endif

                    forwardContext.UpstreamRequest.Headers.Authorization =
                        new AuthenticationHeaderValue("Bearer", accessToken);
                    startupLogger.LogDebug($"Proxy Authorization: {forwardContext.UpstreamRequest.Headers.Authorization}");
                }

                try
                {
                    startupLogger.LogDebug("Proxy send started");
                    var response = await forwardContext.Send();
                    if (!response.IsSuccessStatusCode)
                    {
                        var errorMessage = $"Proxy error: {response.StatusCode.ToString()}:{response.ReasonPhrase} - " +
                                           $"{await response.Content.ReadAsStringAsync()}";
                        startupLogger.LogError(errorMessage);
                    }
                    response.Headers.Remove("Authorization");
                    startupLogger.LogDebug($"Proxy response: {await response.Content.ReadAsStringAsync()}");
                    return response;
                }
                catch (Exception e)
                {
                    startupLogger.LogError(e.Message);
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.InternalServerError,
                        ReasonPhrase = e.Message
                    };
                }
            });

            app.Use(async (context, next) =>
            {
                startupLogger.LogInformation(
                    "Auth diagnostic: Authenticated={Authenticated}, Name={Name}, " +
                    "IsAdministrator={IsAdministrator}, HasAccessToken={HasAccessToken}, " +
                    "Claims={Claims}",
                    context.User.Identity?.IsAuthenticated,
                    context.User.Identity?.Name,
                    context.User.IsInRole("Administrator"),
                    !string.IsNullOrWhiteSpace(
                        await context.GetTokenAsync("access_token")),
                    string.Join(
                        "; ",
                        context.User.Claims.Select(
                            claim => $"{claim.Type}={claim.Value}")));

                await next();
            });

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
                endpoints.MapHealthChecks(AppSettings.EnvironmentConfig.HealthCheckPublicAPIEndpoint, new HealthCheckOptions()
                {
                    Predicate = _ => true,
                    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
                });
                endpoints.MapHealthChecksUI(setup =>
                {
                    setup.AddCustomStylesheet("wwwroot/NICE.Style.css");
                }).RequireAuthorization(new AuthorizeAttribute(AdministratorRole));
            });

            app.MapWhen(
                httpContext =>
                    !httpContext.User.Identity.IsAuthenticated &&
                    !httpContext.Request.Path
                        .StartsWithSegments(AppSettings.EnvironmentConfig.HealthCheckPublicAPIEndpoint),
                builder =>
                {
                    builder.Run(async context =>
                    {
                        await niceAuthenticationService.Login(
                            context,
                            context.Request.Path);
                    });
                });


            app.MapWhen(httpContext => httpContext.User.Identity.IsAuthenticated && !httpContext.User.IsInRole(AdministratorRole), builder =>
            {
                builder.Run(async httpContext =>
                {
                    startupLogger.LogWarning($"User: {httpContext.User.DisplayName()} with id: {httpContext.User.NameIdentifier()} has tried accessing {httpContext.Request.Host.Value}{httpContext.Request.Path} but does not have access");
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;

                    var permissionDeniedViewAsString = await new PermissionDeniedController().RenderViewAsync(httpContext: httpContext, viewName: "PermissionDenied");
                    httpContext.Response.ContentType = "text/html";
                    await httpContext.Response.WriteAsync(permissionDeniedViewAsString);
                });
            });

            app.MapWhen(
                httpContext =>
                    httpContext.User.Identity.IsAuthenticated &&
                    httpContext.User.IsInRole(AdministratorRole),
                builder =>
                {
                    builder.UseRouting();

                    builder.UseEndpoints(endpoints =>
                    {
                        endpoints.MapReverseProxy();
                    });
                });
        }

    }
}
