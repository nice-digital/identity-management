using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NICE.Identity.Management.Controllers
{
	[Route("admin/api/[controller]")]
	[ApiController]
	[Authorize(Roles = "Administrator")]
	public class HomeController : ControllerBase
	{
		/// <summary>
		/// GET: /home/sample
		/// </summary>
		/// <returns></returns>
		[HttpGet]
		public string Sample()
		{
			return "todo";
		}
	}
}
