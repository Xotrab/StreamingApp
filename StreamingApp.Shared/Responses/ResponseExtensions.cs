using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Shared.Responses
{
    public static class ResponseExtensions
    {
        public static Response ToResponseSuccess(this string message) 
        {
            return new Response
            {
                Success = true,
                Message = message
            };
        }

        public static Response ToResponseFail(this string message)
        {
            return new Response
            {
                Success = false,
                Message = message
            };
        }

        public static Response ToResponseErrorList(this string message, IEnumerable<string> errors)
        {
            return new Response
            {
                Success = false,
                Message = message,
                Errors = errors
            };
        }

        public static Response<T> ToResponseData<T>(this T data)
        {
            return new Response<T>
            {
                Success = true,
                Data = data
            };
        }

        public static Response<string> ToResponseDataFail(this string message)
        {
            return new Response<string>
            {
                Success = false,
                Message = message,
                Data = null
            };
        }
    }
}
