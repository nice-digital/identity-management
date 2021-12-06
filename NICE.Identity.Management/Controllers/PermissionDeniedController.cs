using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NICE.Identity.Management.Controllers
{
	public class PermissionDeniedController : Controller
	{
		public IActionResult Index()
		{
			return View("PermissionDenied");
		}
	}
}
