using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using NICE.Identity.Authentication.Sdk.Authentication;
using NICE.Identity.Management.Models;
using System;
using System.Collections.Generic;
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

        [Route("/signin-auth0")]
		public ActionResult CallBack(string returnUrl = "/")
        {
	        return Redirect(returnUrl);
        }
	}
}