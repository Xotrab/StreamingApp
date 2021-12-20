using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.DTOs
{
    public class UploadSongDto
    {
        public IFormFile File { get; set; }

        public string Genre { get; set; }
    }
}
