using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using NICE.Identity.Authentication.Sdk.Authentication;
using NICE.Identity.Authentication.Sdk.Domain;
using NICE.Identity.Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NICE.Identity.Management.Controllers
{
	[Route("[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuthenticationService _niceAuthenticationService;
        private readonly LinkGenerator _linkGenerator;
        private readonly ILogger<AccountController> _logger;

		public AccountController(IHttpContextAccessor httpContextAccessor, IAuthenticationService niceAuthenticationService, LinkGenerator linkGenerator, ILogger<AccountController> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _niceAuthenticationService = niceAuthenticationService;
            _linkGenerator = linkGenerator;
            _logger = logger;
        }

        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = 0)]
        public async Task Login(string returnUrl = "/")
        {
            var url = returnUrl + (returnUrl.Contains('?') ? '&' : '?') + new Random().NextDouble();
            await _niceAuthenticationService.Login(_httpContextAccessor.HttpContext, url);
        }

        [Authorize]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = 0)]
        public async Task Logout(string returnUrl = "/")
        {
            var url = returnUrl + (returnUrl.Contains('?') ? '&' : '?') + new Random().NextDouble(); 
            await _niceAuthenticationService.Logout(_httpContextAccessor.HttpContext, url);
        }

        [AllowAnonymous]
        [HttpGet]
        [Produces("application/json")]
        public ActionResult<Status> Status()
        {
	        try
	        {
		        if (!this.User.Identity.IsAuthenticated)
		        {
			        return new ActionResult<Status>(new Status(isAuthenticated: false, displayName: null,
				        links: new List<KeyValuePair<string, string>> { new KeyValuePair<string, string>("Sign in", _linkGenerator.GetPathByAction(HttpContext, nameof(Login))) }));
		        }

                //todo: once the profile page is up, add a link to it and any other accessible system potentially using this.User.Claims
                var claims = this.User.Claims;
                var displayName = claims?.FirstOrDefault(x => x.Type.Equals("name", StringComparison.OrdinalIgnoreCase))?.Value;

                return new ActionResult<Status>(new Status(isAuthenticated: true, displayName: displayName,
			        links: new List<KeyValuePair<string, string>> { 
                        new KeyValuePair<string, string>("Sign out", _linkGenerator.GetPathByAction(HttpContext, nameof(Logout))),
                        new KeyValuePair<string, string>("Health checks", "/healthchecks-ui")
                    }));
	        }
	        catch (Exception e)
	        {
		        return StatusCode(503, e.Message);
	        }
        }
	}
}