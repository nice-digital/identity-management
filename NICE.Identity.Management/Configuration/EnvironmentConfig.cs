using System.Collections.Generic;

namespace NICE.Identity.Management.Configuration
{
    public class EnvironmentConfig
    {
	    
	    public string Name { get; set; }

        public string HealthChecksAPIEndpoint { get; set; }

        public string[] AuthenticatedEndpoints { get; set; }

        public string AuthenticatedHealthCheckAPIKey { get; set; }
    }
}
