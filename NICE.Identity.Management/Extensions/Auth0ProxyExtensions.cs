using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
            var accessToken = GetAccessTokenFromAuth0(auth0Configuration, _httpClient);

            if (forwardContext.UpstreamRequest.Headers.Contains(authorisation))
            {
                var tokenString = forwardContext.UpstreamRequest.Headers.Authorization.Parameter;
                var jwtEncodedString = tokenString.Substring(7); // trim 'Bearer ' from the start since its just a prefix for the token string
                var token = new JwtSecurityToken(jwtEncodedString: jwtEncodedString);

                if (token.ValidTo < DateTime.UtcNow)
                {
                    forwardContext.UpstreamRequest.Headers.Remove(authorisation);
                }               
            }
            
            if (!forwardContext.UpstreamRequest.Headers.Contains(authorisation))
            {
                forwardContext.UpstreamRequest.Headers.Add(authorisation, $"bearer {accessToken.AccessToken}");
            }

            return forwardContext;
        }

        private static Auth0TokenResponse GetAccessTokenFromAuth0(IOptions<Auth0Configuration> configuration, HttpClient client)
        {
            var httpResponseMessage = client.PostAsync("oauth/token", configuration.Value.GetTokenRequest).Result;

            if (!httpResponseMessage.IsSuccessStatusCode)
            {
                var errorContent = httpResponseMessage.Content.ReadAsStringAsync().Result;
                throw new Exception($"Unable to get token for client with id {configuration.Value.ClientId}. Response status: {httpResponseMessage.StatusCode}. Response: {errorContent}.");
            }

            var data = httpResponseMessage.Content.ReadAsStringAsync().Result;
            return JsonConvert.DeserializeObject<Auth0TokenResponse>(data);
        }
    }
}
