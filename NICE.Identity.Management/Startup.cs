using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using NICE.Identity.Management.Configuration;
using NICE.Identity.Authentication.Sdk;
using NICE.Identity.Authentication.Sdk.Abstractions;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

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
			services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
			services.TryAddTransient<INICEAuthenticationService, NICEAuthenticationService>();

			services.Configure<CookiePolicyOptions>(options =>
			{
				// This lambda determines whether user consent for non-essential cookies is needed for a given request.
				options.CheckConsentNeeded = context => true;
				options.MinimumSameSitePolicy = SameSiteMode.None;
			});
			
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

			// Add authentication services
			services.AddAuthenticationSdk(Configuration);

			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "Administration/build";
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ISeriLogger seriLogger, 
			IApplicationLifetime appLifetime, INICEAuthenticationService niceAuthenticationService)
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

			app.UseHttpsRedirection();
			app.UseCookiePolicy();
			app.UseAuthentication();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

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
					spa.Options.SourcePath = "Administration";

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
