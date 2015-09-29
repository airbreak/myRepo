using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace test.Controllers
{
    public class ShopController : Controller
    {
        //
        // GET: /Shop/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Products()
        {
            string ss = "[{\"id\": 0,\"title\": \"Paint pots\",\"description\": \"Pots full of paint\",\"price\": 3.95},{\"id\": 1,\"title\": \"Paint pots\",\"description\": \"Pots full of paint\",\"price\": 6.95}]";
            return Json(ss);
        }

        public ActionResult FormSubmit(string name,string email)
        {
            var ss = Request["name"];
            var sss = Request["email"];
            return Json("sucess");
        }

    }
}
