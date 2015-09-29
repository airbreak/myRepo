using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace test.Service
{
    public class interfaceService2 : IPrint
    {
        public void Print()
        {
            System.Console.WriteLine("B");
        }
    }
}