using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace test.Controllers
{
    public class SortableController : Controller
    {
        public ActionResult SortableForMenu(string newSort)
        {
            return Json("success");
        }
    }
}
