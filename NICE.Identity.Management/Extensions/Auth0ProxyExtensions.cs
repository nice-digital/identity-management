using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NICE.Identity.Management.Configuration;
using NICE.Identity.Management.Models;
using ProxyKit;

namespace NICE.Identity.Management.Extensions
{
    public static class Auth0ProxyExtensions
    {
        public const string authorisation = "Authorization";

        public static ForwardContext AddAuth0AccessToken(this ForwardContext forwardContext, IOptions<Auth0Configuration> auth0Configuration, IHttpClientFactory clientFactory)
        {
            var _httpClient = clientFactory.CreateClient("Auth0ApiToken");
            var accessToken = GetAccessTokenFromAuth0(auth0Configuration, _httpClient).Result;
            forwardContext.UpstreamRequest.Headers.Add(authorisation, $"bearer {accessToken}");
            return forwardContext;
        }

        private static async Task<Auth0TokenResponse> GetAccessTokenFromAuth0(IOptions<Auth0Configuration> configuration, HttpClient client)
        {
            var httpResponseMessage = client.PostAsync("oauth/token", configuration.Value.GetTokenRequest).Result;

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                var errorContent = await httpResponseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
                throw new Exception($"Unable to get token for client with id {configuration.Value.ClientId}. Response status: {httpResponseMessage.StatusCode}. Response: {errorContent}.");
            }

            var data = await httpResponseMessage.Content.ReadAsStringAsync().ConfigureAwait(false);
            return JsonConvert.DeserializeObject<Auth0TokenResponse>(data);
        }
    }
}
