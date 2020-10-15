using NICE.Identity.Management.Configuration;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace NICE.Identity.Management
{
	/// <summary>
	/// A DelegatingHandler, adds a handler into the handler chain of the http request
	/// https://www.asp.net/media/4071077/aspnet-web-api-poster.pdf
	///
	/// In this case, all it's doing is checking to see if this healthcheck requires an api key, and if so, it adds it as a header.
	/// </summary>
	public class HealthCheckDelegatingHandler : DelegatingHandler
	{
		protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
		{
			if (AppSettings.EnvironmentConfig.HealthCheckAuthenticatedEndpoints.Contains(request.RequestUri.AbsoluteUri, StringComparer.OrdinalIgnoreCase))
			{
				request.Headers.Add("X-Api-Key", AppSettings.EnvironmentConfig.HealthCheckAuthenticatedAPIKey);
			}
			return base.SendAsync(request, cancellationToken);
		}
	}
}
