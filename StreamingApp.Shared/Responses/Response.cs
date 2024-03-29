﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Shared.Responses
{
    public class Response
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }

    public class Response<T> : Response
    {
        public T Data { get; set; }
    }
}
