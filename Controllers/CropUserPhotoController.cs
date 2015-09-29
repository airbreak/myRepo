using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace test.Controllers
{
    public class CropUserPhotoController : Controller
    {
        //
        // GET: /CropUserPhoto/

        public ActionResult Index()
        {
            return View();
        }

        //[HttpPost]
        public string UploadUerPhoto1() 
        {
            HttpPostedFileBase file = Request.Files["dataImportFileInput"];
            string uniqId=GetGuid();
            Session[uniqId]=file;
            string ss = file.FileName;
            //string filePath = Server.MapPath("~/Files/cropPhoto/" + Path.GetFileName(file.FileName));
            string filePath = Server.MapPath("~/Files/cropPhoto/" +
                Path.GetFileName(file.FileName));
            if (System.IO.File.Exists(filePath)) 
            {
                System.IO.File.Delete(filePath);
            }
            try
            {
                file.SaveAs(filePath);
                return "success,"+uniqId;
            }
            catch(Exception e)
            { 
                return "fail";
            }

            
        }

        /// <summary>
        /// 上传图片并保存到session中
        /// </summary>
        /// <returns></returns>
         [HttpPost]
        public string UploadUerPhoto()
        {
            HttpPostedFileBase file = Request.Files["dataImportFileInput"];

            byte[] data;
            using (Stream inputStream = file.InputStream)
            {
                MemoryStream memoryStream = inputStream as MemoryStream;
                if (memoryStream == null)
                {
                    memoryStream = new MemoryStream();
                    inputStream.CopyTo(memoryStream);
                }
                data = memoryStream.ToArray();
            }
           
            string uniqId = GetGuid();
            Session[uniqId] = data;



            //string ss = file.FileName;
            ////string filePath = Server.MapPath("~/Files/cropPhoto/" + Path.GetFileName(file.FileName));
            //string filePath = Server.MapPath("~/Files/cropPhoto/" +
            //    Path.GetFileName(file.FileName));
            //if (System.IO.File.Exists(filePath))
            //{
            //    System.IO.File.Delete(filePath);
            //}
            try
            {
                //file.SaveAs(filePath);
                return "success," + uniqId;
            }
            catch (Exception e)
            {
                return "fail";
            }


        }

        /*对图片进行裁剪*/
        /// <summary>
        /// 将图片流在前台显示
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        public FileResult GetUploadImg(string sessionId)
        {   
            byte[] byData = new byte[0];
            if (Session[sessionId] != null)
            {
                object obj = Session[sessionId];
                byData = (byte[])obj;
            }

            return File(byData, "image/jpg");
        }


        /*对图片进行裁剪*/
        public string CropeImg(int x, int y, int x2, int y2, int height, int width, string sessionId)
        {
            //发送请求
            byte[] byData = new byte[0];
            if (Session[sessionId] != null)
            {
                object obj = Session[sessionId];
                byData = (byte[])obj;
            }
            
         
          
            Stream stream = new MemoryStream(byData);
            System.Drawing.Image img = System.Drawing.Image.FromStream(stream);

            int _x = Math.Abs((x * img.Width) / 200);
            int _y = Math.Abs(y  * img.Height/ 200);
            int _width = Math.Abs(width  * img.Width/ 200);
            int _height = Math.Abs(height * img.Height / 200);
            if (img.Width < _x + _width || img.Height < _y + _height)
            {
                Response.Write("截取区域超出图片本身范围！");
                img.Dispose();
                return "fail";
            }

            //执行裁剪
            System.Drawing.Rectangle cropArea = new System.Drawing.Rectangle(_x, _y, _width, _height);

            System.Drawing.Bitmap bmpImage=new System.Drawing.Bitmap(img);

            System.Drawing.Bitmap bmpCrop = bmpImage.Clone(cropArea, bmpImage.PixelFormat);

            string guid=GetGuid();
            string filePath = Server.MapPath("~/Files/cropPhoto/result_" +guid+".jpg");
            bmpCrop.Save(filePath);
            img.Dispose();
            bmpCrop.Dispose();
            return "Files/cropPhoto/result_" +guid+".jpg";
        }

        public static string GetGuid()
        {
            Guid guid = new Guid();
            guid = Guid.NewGuid();
            string str = guid.ToString();
            return str;
        }




    }
}
