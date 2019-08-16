using System;
using System.Net.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.Options;
using NICE.Identity.Management.Configuration;
using NICE.Identity.Authentication.Sdk;
using NICE.Identity.Authentication.Sdk.Abstractions;
using NICE.Identity.Authentication.Sdk.Authentication;
using NICE.Identity.Authentication.Sdk.Configuration;
using NICE.Identity.Authentication.Sdk.Extensions;
using NICE.Identity.Management.Extensions;
using ProxyKit;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace NICE.Identity.Management
{
	public class Startup
	{
		public Startup(IConfiguration configuration, IHostingEnvironment environment)
		{
			Configuration = configuration;
			Environment = environment;
		}

		public IConfiguration Configuration { get; }
		public IHostingEnvironment Environment { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			AppSettings.Configure(services, Configuration, Environment.IsDevelopment() ? @"c:\" : Environment.ContentRootPath);

			
			//dependency injection goes here.
			services.TryAddSingleton<ISeriLogger, SeriLogger>();
			var authConfiguration = new AuthConfiguration(Configuration, "AuthConfiguration");
			services.TryAddSingleton<IAuthConfiguration>(authConfiguration);

			services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
			services.TryAddTransient<IAuthenticationService, Auth0Service>();
			//services.Configure<Auth0Configuration>(Configuration.GetSection("Auth0"));
			services.Configure<CustomAPiConfiguration>(Configuration.GetSection("ProxyEndpoint"));

            services.AddProxy();
            services.Configure<CookiePolicyOptions>(options =>
			{
				// This lambda determines whether user consent for non-essential cookies is needed for a given request.
				options.CheckConsentNeeded = context => true;
				options.MinimumSameSitePolicy = SameSiteMode.None;
			});
			
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
			//services.AddHttpClientWithHttpConfiguration<Auth0Configuration>("Auth0ApiToken");
			// Add authentication services
			//services.AddAuthenticationSdk(Configuration, "Auth0");
			services.AddAuthenticationSdk(authConfiguration);

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "Administration/build";
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ISeriLogger seriLogger, 
			IApplicationLifetime appLifetime, IAuthenticationService niceAuthenticationService,
			IAuthConfiguration authConfiguration,IOptions<CustomAPiConfiguration> customApi, IHttpClientFactory httpClientFactory)
		{
			seriLogger.Configure(loggerFactory, Configuration, appLifetime, env);
			var startupLogger = loggerFactory.CreateLogger<Startup>();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
				loggerFactory.AddConsole(Configuration.GetSection("Logging"));
				loggerFactory.AddDebug();
			}
			else
			{
				app.UseExceptionHandler("/Home/Error");
				app.UseHsts();
				app.UseStatusCodePagesWithReExecute("/error/{0}"); // url to errorcontroller
			}


			app.RunProxy("/api",
				 async context =>
				{
					var forwardContext = context.ForwardTo(customApi.Value.ApiEndpoint);
					forwardContext.AddAuth0AccessToken(authConfiguration, httpClientFactory);
					var response = await forwardContext.Send();
					response.Headers.Remove("Authorization");
					return response;
				});

            app.UseHttpsRedirection();
			app.UseCookiePolicy();
			app.UseAuthentication();
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

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.MapWhen(x => x.User.Identity.IsAuthenticated, builder =>
			{
				builder.Use((context, next) =>
				{
					var httpRequestFeature = context.Features.Get<IHttpRequestFeature>();

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

					if (env.IsDevelopment())
					{
						spa.UseReactDevelopmentServer(npmScript: "start");
					}
				});
			});

			app.MapWhen(x => !x.User.Identity.IsAuthenticated, builder =>
			{
				builder.Run(async context =>
				{
					await niceAuthenticationService.Login(context, context.Request.Path);
				});
			});
		}


    }
}
