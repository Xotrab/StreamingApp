using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StreamingApp.Controllers
{
    [Route("")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private readonly IAzureService mAzureService;
        private readonly ISongService mSongService;
        public SongController(IAzureService azureService, ISongService songService)
        {
            mAzureService = azureService;
            mSongService = songService;
        }

        [Authorize]
        [HttpPost("songs")]
        public async Task<IActionResult> UploadSongAsync([FromForm] UploadSongDto uploadSongDto) 
        {
            var azureResult = await mAzureService.UploadAsync(uploadSongDto);

            if (!azureResult.Success)
                return BadRequest(azureResult);

            var songUrl = azureResult.Data;
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mSongService.AddAsync(uploadSongDto, songUrl, userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("uploads")]
        public async Task<IActionResult> GetUploadedAsync()
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var result = await mSongService.GetUploadedAsync(userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("likes")]
        public async Task<IActionResult> GetLikedSongsAsync()
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var result = await mSongService.GetLikedSongsAsync(userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
