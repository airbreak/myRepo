using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using test.Models;

namespace test.Controllers
{
    public class GetZipFilesController : Controller
    {
        //
        // GET: /GetZipFiles/

        public ActionResult Index()
        {
            return View("~/Views/GetzipFiles/ZipFolder.cshtml");
        }

        /// <summary>
        /// 
        /// </summary>
        public void PackageFolder() 
        {
            PackageZipFiles pack = new PackageZipFiles();
            string path = Server.MapPath("~/Files/guitar");
            string targetPath = Server.MapPath("~/Files/guitar");
            pack.PackageFolder(path,targetPath,true);
        }
    }
}
