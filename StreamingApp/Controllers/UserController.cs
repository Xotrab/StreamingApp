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
    public class UserController : ControllerBase
    {
        private readonly IUserService mUserService;

        public UserController(IUserService userService)
        {
            mUserService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid register data");
            
            var result = await mUserService.LoginUserAsync(loginDto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody]RegisterDto registerDto)
        { 
            if (!ModelState.IsValid)
                return BadRequest("Invalid register data");

            var result = await mUserService.RegisterUserAsync(registerDto);

            if (!result.Success)
            {
                return BadRequest(result);
            }
            
            return Ok(result);
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
                return NotFound();

            var result = await mUserService.ConfirmEmailAsync(userId, token);

            if (result.Success)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpGet("follows")]
        public async Task<IActionResult> GetUserFollowsAsync()
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var result = await mUserService.GetUserFollowsAsync(userId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("follows/{followedId}")]
        public async Task<IActionResult> FollowUserAsync(int followedId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var result = await mUserService.FollowUserAsync(userId, followedId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("follows/{followedId}")]
        public async Task<IActionResult> UnfollowUserAsync(int followedId)
        {
            var userId = int.Parse(User.FindFirst("id").Value);

            var result = await mUserService.UnfollowUserAsync(userId, followedId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
