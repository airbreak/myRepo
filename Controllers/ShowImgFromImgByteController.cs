using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace test.Controllers
{
    public class ShowImgFromImgByteController : Controller
    {
        //
        // GET: /ShowImgFromImgByte/

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 远程图片
        /// </summary>
        /// <returns></returns>
        public FileResult ShowImage1() {
            string url = "http://127.0.0.1/geosurveyService/Files/Fossil/I44C002003/1-1.jpg";

            Stream stream = WebRequest.Create(url).GetResponse().GetResponseStream();
            WebResponse req = WebRequest.Create(url).GetResponse();
            ////BinaryReader br = new BinaryReader(stream);
            ////byte[] buffer = br.ReadBytes(); 
            //byte[] buffer = new byte[req.ContentLength];
            //stream.Read(buffer, 0, (int)req.ContentLength);
            int size = 1024;
            int read = 0;
            //MemoryStream ms = new MemoryStream();
            byte[] buffer = new byte[req.ContentLength];
            do
            {
                //buffer = new byte[size];
                read = stream.Read(buffer, 0, size);
                //stream.Write(buffer, 0, read);
            } while (read > 0);
            return File(buffer, "image/jpg");
        }

        /// <summary>
        /// 本地图片
        /// </summary>
        /// <returns></returns>
        public FileResult ShowImage(string id)
        {
            string _path = string.Concat(System.AppDomain.CurrentDomain.BaseDirectory, "Content\\images\\longmao.png");
            FileStream fs = new FileStream(_path, FileMode.Open);
            byte[] byData = new byte[fs.Length];
            fs.Read(byData, 0, byData.Length);
            fs.Close();
            return File(byData, "image/jpg");
        }

        public  string SendPost(string url)
        {
            try
            {
                //发送请求
                var req = (HttpWebRequest)WebRequest.Create(url);
                req.Timeout = 1000 * 3000;//50分钟
                var rep = (HttpWebResponse)req.GetResponse();//得到请求结果
                Stream stream = rep.GetResponseStream();
                if (stream != null)
                    using (var reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        string responseHtml = reader.ReadToEnd();
                        rep.Close();
                        return responseHtml;
                    }
                rep.Close();
                return null;//如果结果流为空，则返回为空
            }
            catch (Exception exp)
            {
                //var temp = exp.Message;
                throw exp;//抛出异常
                //return null;//未查询到数据时，404错误
            }
           
        }

        public void UploadFiles()
        {
            string ss = "123123";
        }

        [HttpPost]
        public ActionResult PasteImage()
        {
            var fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + ".png";
            var filePhysicalPath = Server.MapPath("~/Files/upload/" + fileName);//我把它保存在网站根目录的 upload 文件夹
            var data1 = Request.Form["data"].ToString();
            var data = data1.Replace("%2f", "/").Replace("%3d", "=");
            byte[] bytes1 = Convert.FromBase64String(data);
            MemoryStream memStream1 = new MemoryStream(bytes1);
            Image a = new Bitmap(memStream1);

            a.Save(filePhysicalPath);
            var url = "/upload/" + fileName;
            return Content(url);
        }

        public class DownloadUploadForDiscoveryModel
        {
            [Required]
            public HttpPostedFileBase filedata { get; set; }
            [Required]
            public String ConnetionId { get; set; }
            public String ShareChannelId { get; set; }
            [Required]
            public string Name { get; set; }

            public String ToCustomerId { get; set; }
            public bool IsShare { get; set; }

            public string FirstComment { get; set; }

        }

    }
}
