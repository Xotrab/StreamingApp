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

        [Authorize]
        [HttpPost("playlists/{playlistId}/songs")]
        public async Task<IActionResult> AddSongAsync(int playlistId, [FromForm] int songId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mPlaylistService.AddSongAsync(playlistId, songId, userId);

            if (result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpDelete("playlists/{playlistId}/songs/{songId}")]
        public async Task<IActionResult> RemoveSongAsync(int playlistId, int songId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mPlaylistService.RemoveSongAsync(playlistId, songId, userId);

            if (result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("playlists/{playlistId}/likes")]
        public async Task<IActionResult> LikePlaylistAsync(int playlistId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mPlaylistService.LikePlaylistAsync(playlistId, userId);

            if (result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpDelete("playlists/{playlistId}/likes")]
        public async Task<IActionResult> DislikePlaylistAsync(int playlistId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);
            var result = await mPlaylistService.DislikePlaylistAsync(playlistId, userId);

            if (result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
