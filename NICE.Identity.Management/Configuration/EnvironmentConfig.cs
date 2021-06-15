using System.Collections.Generic;

namespace NICE.Identity.Management.Configuration
{
    public class EnvironmentConfig
    {
	    
	    public string Name { get; set; }

        public string HealthCheckPublicAPIEndpoint { get; set; }

        public string[] HealthCheckAuthenticatedEndpoints { get; set; }

        public string HealthCheckAuthenticatedAPIKey { get; set; }
    }
}
