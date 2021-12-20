using Microsoft.AspNetCore.Http;
using StreamingApp.Shared.Enums;
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

        public Genre Genre { get; set; }
    }
}
