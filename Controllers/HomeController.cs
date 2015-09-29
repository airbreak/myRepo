using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Service;

namespace test.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Canvas()
        {
            return View("Canvas");
        }


        public ActionResult Index()
        {
            interfaceService a = new interfaceService();
            a.Print();
            interfaceService2 b = new interfaceService2();
            b.Print();
            return View("Navigation");
        }

        public ActionResult ApplyMethon() 
        {
            return View("ApplyMethon");
        }

        public ActionResult CropUserPhoto()
        {
            return View();
        }

        public ActionResult ShowEchart() 
        {
            return View();
        }

        public ActionResult UploadFileByIframe() 
        {
            return View();
        }

        public ActionResult ContentInsertSlide()
        {
            return View();
        }

        public ActionResult RightPanelTest() 
        {
            return View();
        }

        public ActionResult GetDiscussTime()
        {
            return View();
        }

        public ActionResult ProgressBar()
        {
            return View();
        }

        public ActionResult TestAtFunctionMy()
        {
            return View();
        }

        public ActionResult SingnalR() 
        {
            return View();
        }

        public ActionResult JavacriptArguments()
        {
            return View();
        }

        public ActionResult PasteImgFromClipboard()
        {
            return View();
        }

        public ActionResult AngularJS()
        {
            return View();
        }

        public ActionResult ColorBlocks()
        {
            return View();
        }

        public ActionResult Dragable()
        {
            return View();
        }

        public ActionResult SetTextareaCursorPostion() 
        {
            return View();
        }

        public ActionResult AudioTest()
        {
            return View();
        }

        public ActionResult IndexDB()
        {
            return View();
        }
        public ActionResult Sort()
        {
            return View();
        }
        public ActionResult LessTest()
        {
            return View();
        }

        public ActionResult JQueryMobile()
        {
            return View();
        }

        public ActionResult LocalStorage()
        {
            return View();
        }

    }
}
