using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace test.Controllers
{
    public class UploadFileByIframeController : Controller
    {
        //
        // GET: /UploadFileByIframe/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UploadFileByIframe() 
        {

            return Json("123");
        }


    }
}
