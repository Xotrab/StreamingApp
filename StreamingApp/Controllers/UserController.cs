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

        [HttpPost("/register")]
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

    }
}
