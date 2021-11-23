using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;

namespace NICE.Identity.Management.Extensions
{
	public static class ControllerExtensions
	{
		public static async Task<string> RenderViewAsync(this Controller controller, string viewName, bool partial = false, HttpContext httpContext = null)
		{
			var ignore = new object();
			return await RenderViewAsync(controller, viewName, ignore, partial, httpContext);
		}

		public static async Task<string> RenderViewAsync<TModel>(this Controller controller, string viewName, TModel model, bool partial = false, HttpContext httpContext = null) 
		{
			if (string.IsNullOrEmpty(viewName))
			{
				viewName = controller.ControllerContext.ActionDescriptor.ActionName;
			}

			controller.ViewData.Model = model;

			using (var writer = new StringWriter())
			{
				HttpContext context = httpContext ?? controller.HttpContext;
				var actionContext = GetActionContext(context.RequestServices);
				IViewEngine viewEngine = context.RequestServices.GetService(typeof(IRazorViewEngine)) as IRazorViewEngine;
				ViewEngineResult viewResult = viewEngine.FindView(actionContext, viewName, !partial); // viewEngine.FindView(controller.ControllerContext, viewName, !partial);

				if (viewResult.Success == false)
				{
					return $"A view with the name {viewName} could not be found";
				}

				ViewContext viewContext = new ViewContext(
					actionContext,
					viewResult.View,
					controller.ViewData,
					new TempDataDictionary(context, new SessionStateTempDataProvider(null)),
					writer,
					new HtmlHelperOptions()
				);

				await viewResult.View.RenderAsync(viewContext);

				return writer.GetStringBuilder().ToString();
			}
		}

		private static ActionContext GetActionContext(IServiceProvider serviceProvider)
		{
			var httpContext = new DefaultHttpContext();
			httpContext.RequestServices = serviceProvider;
			return new ActionContext(httpContext, new RouteData(), new ActionDescriptor());
		}

		//private IView FindView(ActionContext actionContext, string viewName)
		//{
		//	var getViewResult = _viewEngine.GetView(executingFilePath: null, viewPath: viewName, isMainPage: true);
		//	if (getViewResult.Success)
		//	{
		//		return getViewResult.View;
		//	}

		//	var findViewResult = _viewEngine.FindView(actionContext, viewName, isMainPage: true);
		//	if (findViewResult.Success)
		//	{
		//		return findViewResult.View;
		//	}

		//	var searchedLocations = getViewResult.SearchedLocations.Concat(findViewResult.SearchedLocations);
		//	var errorMessage = string.Join(
		//		Environment.NewLine,
		//		new[] { $"Unable to find view '{viewName}'. The following locations were searched:" }.Concat(
		//			searchedLocations));
		//	;

		//	throw new InvalidOperationException(errorMessage);
		//}
	}
}
