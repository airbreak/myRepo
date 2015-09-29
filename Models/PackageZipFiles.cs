using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.IO.Packaging;
using System.Web;
using ICSharpCode.SharpZipLib.Zip;

namespace test.Models
{
    public class PackageZipFiles
    {

        /// <summary>
        /// 将目标数据压缩到目标文件中
        /// </summary>
        /// <param name="srcFiles">目标数据</param>
        /// <param name="resultFiles">目标文件</param>
        /// <param name="bufferSize"></param>
        public void Zip(string srcFiles, string resultFiles, int bufferSize)
        {
            //目标文件
            FileStream fileInStream = new FileStream(srcFiles,FileMode.Open,FileAccess.Read);
            //结果文件
            FileStream fileOutStream = new FileStream(resultFiles, FileMode.Create, FileAccess.Write);
            
            //压缩文件
            ZipOutputStream zipOutStream = new ZipOutputStream(fileOutStream);
            byte[] buffer = new byte[bufferSize];
            ZipEntry entry = new ZipEntry(Path.GetFileName(srcFiles));
            zipOutStream.PutNextEntry(entry); ;
            int size;
            do {
                size = fileInStream.Read(buffer,0,buffer.Length);
                zipOutStream.Write(buffer, 0, size);
            }
            while (size > 0);
            zipOutStream.Close();
            fileOutStream.Close();
            fileInStream.Close();

        }

        /// <summary>
        /// 打包文件
        /// </summary>
        /// <param name="folderName">目标文件夹</param>
        /// <param name="compressFileName">生成的压缩包</param>
        /// <param name="overrideExisting">是否覆盖</param>
        /// <returns></returns>
        public bool PackageFolder(string folderName, string compressFileName, bool overrideExisting)
        {
            bool result = false;
            if (!Directory.Exists(folderName))
            {
                return result;
            }
            if (!overrideExisting && File.Exists(compressFileName))
            {
                return result;
            }
            try
            {
                using (Package package = Package.Open(compressFileName,FileMode.Create)) {
                    var fileList = Directory.EnumerateFiles(folderName, "*", SearchOption.AllDirectories);
                    foreach(string fileName in fileList)
                    {
                        string pathtInPackage;
                        pathtInPackage = Path.GetDirectoryName(fileName).Replace(folderName, string.Empty) + "\\" + Path.GetFileName(fileName);
                        Uri partUriDocument = PackUriHelper.CreatePartUri(new Uri(pathtInPackage,UriKind.Relative));
                        PackagePart packagePartDocument = package.CreatePart(partUriDocument,System.Net.Mime.MediaTypeNames.Application.Zip,CompressionOption.Maximum);
                        using (FileStream fileStream = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                        {
                            fileStream.CopyTo(packagePartDocument.GetStream());
                        }
                    }
                }
                result = true;
            }
            catch (Exception e)
            {
                result = false;
                throw new Exception("Error zipping folder"+ folderName,e);
            }
            return result;
        }

    }
}