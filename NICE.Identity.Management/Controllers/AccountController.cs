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
        private readonly INICEAuthenticationService _niceAuthenticationService;

        public AccountController(IHttpContextAccessor httpContextAccessor, INICEAuthenticationService niceAuthenticationService)
        {
            _httpContextAccessor = httpContextAccessor;
            _niceAuthenticationService = niceAuthenticationService;
        }

        public async Task Login(string returnUrl = "/")
        {
            await _niceAuthenticationService.Login(_httpContextAccessor.HttpContext, returnUrl);
        }

        [Authorize]
        public async Task Logout(string returnUrl = "/")
        {
            var url = returnUrl + (returnUrl.Contains('?') ? '&' : '?') + new Random().NextDouble();
            await _niceAuthenticationService.Logout(_httpContextAccessor.HttpContext, url);
        }
    }
}