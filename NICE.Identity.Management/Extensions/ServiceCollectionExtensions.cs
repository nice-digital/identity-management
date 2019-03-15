using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NICE.Identity.Management.Configuration;

namespace NICE.Identity.Management.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static T GetConfiguration<T>(this IServiceCollection collection) where T : class, new()
        {
            var sp = collection.BuildServiceProvider();
            return sp.GetService<IOptions<T>>().Value;
        }

        public static void AddHttpClientWithHttpConfiguration<T>(this IServiceCollection services, string name)
            where T : class, IHttpConfiguration, new()
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            if (name == null)
                throw new ArgumentNullException(nameof(name));

            IHttpConfiguration options = services.GetConfiguration<T>();

            services.AddHttpClient(name,
                                   client =>
                                   {
                                       client.BaseAddress = new Uri(options.Host);
                                       client.Timeout = TimeSpan.FromMinutes(1);
                                       client.DefaultRequestHeaders.Authorization = options.AuthenticationHeaderValue;
                                   })
                    .AddTransientHttpErrorPolicy(options.CircuitBreaker);
        }
    }
}
