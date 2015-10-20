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
            string ss = "[{\"id\": 0,\"title\": \"Paint\",\"description\": \"Pots full of paint\",\"price\": 3.95},{\"id\": 1,\"title\": \"Gots\",\"description\": \"Pots full of paint\",\"price\": 6.95}]";
            return Json(ss);
        }

        public ActionResult VoteImgs() {
            string ss = "[{\"id\": 0,\"title\": \"Paint\",\"url\": \"1.png\",\"vote\": 395},{\"id\": 1,\"title\": \"Gots\",\"url\": \"2.png\",\"vote\": 695},{\"id\": 2,\"title\": \"Yomh\",\"url\": \"3.png\",\"vote\": 595}]";
            return Json(ss);
        }

        [HttpPost]
        public ActionResult FormSubmit(User newUser)
        {
            var ss = Request["name"];
            var sss = Request["email"];
            return Json(newUser);
        }

        public class User {
            public string Name;
            public string Email;
        }

    }
}
