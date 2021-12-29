using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StreamingApp.Controllers
{
    [Route("")]
    [ApiController]
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistService mPlaylistService;

        public PlaylistController(IPlaylistService playlistService)
        {
            mPlaylistService = playlistService;
        }

        [Authorize]
        [HttpPost("playlists")]
        public async Task<IActionResult> CreatePlaylistAsync([FromForm] string playlistName)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mPlaylistService.CreateAsync(playlistName, userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("playlists/{playlistId}")]
        public async Task<IActionResult> GetPlaylistAsync(int playlistId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var briefResult = await mPlaylistService.GetBriefAsync(playlistId, userId);

            if (!briefResult.Success)
                return BadRequest(briefResult);

            var result = await mPlaylistService.GetDetailedAsync(briefResult.Data, userId);

            if (result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpDelete("playlists/{playlistId}")]
        public async Task<IActionResult> RemovePlaylistAsync(int playlistId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mPlaylistService.RemoveAsync(playlistId, userId);

            if (result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
