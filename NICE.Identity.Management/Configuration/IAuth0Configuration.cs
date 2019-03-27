using System.Net.Http;

namespace NICE.Identity.Management.Configuration
{
    public interface IAuth0Configuration
    {
        string ClientId { get; set; }
        string GrantType { get; set; }
        string ClientSecret { get; set; }
        string ApiIdentifier { get; set; }
        StringContent GetTokenRequest { get; }
    }
}