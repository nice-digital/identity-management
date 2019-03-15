using System;
using System.Net.Http;
using System.Net.Http.Headers;
using Polly;

namespace NICE.Identity.Management.Configuration
{
    public interface IHttpConfiguration : IAuth0Configuration
    {
        string Token { get; }
        string Domain { get; set; }
        string Host { get; }
        int HandledEventsAllowedBeforeBreaking { get; set; }
        int DurationOfBreakInMinutes { get; set; }
        Func<PolicyBuilder<HttpResponseMessage>, IAsyncPolicy<HttpResponseMessage>> CircuitBreaker { get; }
        AuthenticationHeaderValue AuthenticationHeaderValue { get; }
    }
}