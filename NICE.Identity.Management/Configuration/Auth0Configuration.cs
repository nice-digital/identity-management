using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Polly;

namespace NICE.Identity.Management.Configuration {
    public class Auth0Configuration : Authentication.Sdk.Configuration.IHttpConfiguration
    {
        public string Token => null;
        public string Domain { get; set; }
		public string Host => $"https://{Domain}/";
	    public string Password { get; set; }
	    public string UserName { get; set; }
	    public int HandledEventsAllowedBeforeBreaking { get; set; }
        public int DurationOfBreakInMinutes { get; set; }

        public Func<PolicyBuilder<HttpResponseMessage>, IAsyncPolicy<HttpResponseMessage>> CircuitBreaker => builder => builder.CircuitBreakerAsync(
            HandledEventsAllowedBeforeBreaking,
            TimeSpan.FromMinutes(DurationOfBreakInMinutes));

        public AuthenticationHeaderValue AuthenticationHeaderValue => null;

        public string ClientId { get; set; }
        public string GrantType { get; set; }
        public string ClientSecret { get; set; }
        public string ApiIdentifier { get; set; }

        public StringContent GetTokenRequest => new StringContent(JsonConvert.SerializeObject(new
                                                                  {
                                                                      grant_type = GrantType,
                                                                      client_id = ClientId,
                                                                      client_secret = ClientSecret,
                                                                      audience = ApiIdentifier
                                                                  }),
                                                                  Encoding.UTF8,
                                                                  "application/json");
    }
}