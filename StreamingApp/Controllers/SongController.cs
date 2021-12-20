using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StreamingApp.Controllers
{
    [Route("")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly IAzureService mAzureService;
        public SongController(IAzureService azureService)
        {
            mAzureService = azureService;
        }

        [HttpPost("songs")]
        public async Task<IActionResult> UploadSongAsync([FromForm] UploadSongDto uploadSongDto) 
        {
            await mAzureService.UploadAsync(uploadSongDto);

            return Ok();
        }
    }
}
