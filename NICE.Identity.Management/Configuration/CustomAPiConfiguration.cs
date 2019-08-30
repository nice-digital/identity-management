using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NICE.Identity.Management.Configuration
{
    public class CustomAPiConfiguration : ICustomAPiConfiguration
    {
        public string ApiEndpoint { get; set; }
    }
}
