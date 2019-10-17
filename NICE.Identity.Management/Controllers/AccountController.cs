using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NICE.Identity.Authentication.Sdk.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Routing;
using NICE.Identity.Management.Models;

namespace NICE.Identity.Management.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuthenticationService _niceAuthenticationService;

        public AccountController(IHttpContextAccessor httpContextAccessor, IAuthenticationService niceAuthenticationService)
        {
            _httpContextAccessor = httpContextAccessor;
            _niceAuthenticationService = niceAuthenticationService;
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
		        var urlHelper = new UrlHelper(ControllerContext);

		        if (!this.User.Identity.IsAuthenticated)
		        {
			        return new ActionResult<Status>(new Status(isAuthenticated: false, displayName: null,
				        links: new List<KeyValuePair<string, string>> { new KeyValuePair<string, string>("Sign in", urlHelper.Action(nameof(Login))) }));
		        }
				//this.User.Claims
		        //todo: get the other links.

		        return new ActionResult<Status>(new Status(isAuthenticated: true, displayName: this.User.Identity.Name,
			        links: new List<KeyValuePair<string, string>> { new KeyValuePair<string, string>("Sign out", urlHelper.Action(nameof(Logout))) }));

	        }
	        catch (Exception e)
	        {
		        return StatusCode(503, e.Message);
	        }
        }
	}
}