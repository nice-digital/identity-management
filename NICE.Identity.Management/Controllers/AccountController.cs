using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NICE.Identity.Authentication.Sdk.Abstractions;
using System.Threading.Tasks;

namespace NICE.Identity.Management.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAuthenticationService _authenticationService;

        public AccountController(IHttpContextAccessor httpContextAccessor, IAuthenticationService authenticationService)
        {
            _httpContextAccessor = httpContextAccessor;
            _authenticationService = authenticationService;
        }

        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = 0)]
        public async Task Login(string returnUrl = "/")
        {
            var url = returnUrl + (returnUrl.Contains('?') ? '&' : '?') + new Random().NextDouble();
            await _authenticationService.Login(_httpContextAccessor.HttpContext, url);
        }

        [Authorize]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true, Duration = 0)]
        public async Task Logout(string returnUrl = "/")
        {
            var url = returnUrl + (returnUrl.Contains('?') ? '&' : '?') + new Random().NextDouble();
            await _authenticationService.Logout(_httpContextAccessor.HttpContext, url);
        }
    }
}