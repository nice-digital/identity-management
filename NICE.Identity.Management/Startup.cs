using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NICE.Identity.Authentication.Sdk.Configuration;
using NICE.Identity.Authentication.Sdk.Extensions;
using NICE.Identity.Management.Configuration;
using ProxyKit;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using CacheControlHeaderValue = Microsoft.Net.Http.Headers.CacheControlHeaderValue;
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

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			AppSettings.Configure(services, Configuration, Environment.IsDevelopment() ? @"c:\" : Environment.ContentRootPath);

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

            services.AddControllers();

            // Add authentication services
            var authConfiguration = new AuthConfiguration(Configuration, "WebAppConfiguration");
            services.AddAuthentication(authConfiguration, allowNonSecureCookie: Environment.IsDevelopment());
            services.AddAuthorisation(authConfiguration);

            // In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});

			services.AddHealthChecks();
			services.AddHealthChecksUI(setupSettings: setup =>
				{
					setup.UseApiEndpointDelegatingHandler<HealthCheckDelegatingHandler>();
				})
				.AddInMemoryStorage();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, ILogger<Startup> startupLogger,
			IHostApplicationLifetime appLifetime, IAuthenticationService niceAuthenticationService, IHttpContextAccessor httpContextAccessor)
		{
			startupLogger.LogInformation("Identity management is starting up");

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
				app.UseStatusCodePagesWithReExecute("/error/{0}"); // url to errorcontroller
			}

            app.RunProxy("/api",async context =>
            {
                var apiEndpoint = Configuration.GetSection("WebAppConfiguration")["ApiIdentifier"];
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

			app.UseHttpsRedirection();
			//app.UseCookiePolicy();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization(); 

			app.UseStaticFiles();
			app.UseSpaStaticFiles( new StaticFileOptions()
			{
				OnPrepareResponse = context =>
				{
					if (context.Context.Request.Path.StartsWithSegments("/static"))
					{
						// cache static resources for one year (versioned filenames)
						var headers = context.Context.Response.GetTypedHeaders();
						headers.CacheControl = new CacheControlHeaderValue
						{
							Public = true,
							MaxAge = TimeSpan.FromDays(365)
						};
					}
					else
					{
						// do not cache other files. also see UseSpa
						var headers = context.Context.Response.GetTypedHeaders();
						headers.CacheControl = new CacheControlHeaderValue
						{
							Public = true,
							NoCache = true, 
							NoStore = true,
							MustRevalidate = true,
							MaxAge = TimeSpan.FromDays(0),
						};
					}
				}
			});

			app.Use((context, next) =>
			{
				if (context.Request.Headers["X-Forwarded-Proto"] == "https" ||
				    context.Request.Headers["Front-End-Https"] == "on" ||
					context.Request.Headers.ContainsKey("X-ARR-SSL"))
				{
					context.Request.Scheme = "https";
				}
				return next();
			});

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapDefaultControllerRoute();
				endpoints.MapHealthChecks(AppSettings.EnvironmentConfig.HealthCheckPublicAPIEndpoint, new HealthCheckOptions()
				{
					Predicate = _ => true,
					ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
				});
				endpoints.MapHealthChecksUI().RequireAuthorization(new AuthorizeAttribute(AdministratorRole));
			});

			app.MapWhen(httpContext => !httpContext.User.Identity.IsAuthenticated, builder =>
			{
				builder.Run(async context =>
				{
					await niceAuthenticationService.Login(context, context.Request.Path);
				});
			});

			app.MapWhen(httpContext => httpContext.User.Identity.IsAuthenticated && !httpContext.User.IsInRole(AdministratorRole), builder =>
			{
				builder.Run(async httpContext =>
				{
					startupLogger.LogWarning($"User: {httpContext.User.DisplayName()} with id: {httpContext.User.NameIdentifier()} has tried accessing {httpContext.Request.Host.Value}{httpContext.Request.Path} but does not have access");
					httpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
					await httpContext.Response.WriteAsync("You do not have access to this website. Please contact support if you think this is incorrect.");
				});
			});

			app.MapWhen(httpContext => httpContext.User.Identity.IsAuthenticated && httpContext.User.IsInRole(AdministratorRole), builder =>
			{
				builder.Use((httpContext, next) =>
				{
					var httpRequestFeature = httpContext.Features.Get<IHttpRequestFeature>();

					if (httpRequestFeature != null && string.IsNullOrEmpty(httpRequestFeature.RawTarget))
						httpRequestFeature.RawTarget = httpRequestFeature.Path;
					return next();
				});
				
				builder.UseSpa(spa =>
				{
					spa.Options.SourcePath = "ClientApp";
					spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions()
					{
						OnPrepareResponse = ctx => {
							// do not cache files. also see UseSpaStaticFiles
							var headers = ctx.Context.Response.GetTypedHeaders();
							headers.CacheControl = new CacheControlHeaderValue
							{
								Public = true,
								NoCache = true, 
								NoStore = true,
								MustRevalidate = true,
								MaxAge = TimeSpan.FromDays(0)
							};
						}
					};

					//if (env.IsDevelopment())
					//{
					//	spa.UseReactDevelopmentServer(npmScript: "start");
					//}
				});
			});
		}

    }
}
