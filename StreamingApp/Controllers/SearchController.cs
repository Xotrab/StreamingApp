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
    public class SearchController : ControllerBase
    {
        private readonly ISearchService mSearchService;

        public SearchController(ISearchService searchService)
        {
            mSearchService = searchService;
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(SearchDto searchDto)
        {
            var userIdString = User.FindFirst("id")?.Value;

            int userIdInt;
            int.TryParse(userIdString, out userIdInt);

            var result = await mSearchService.SearchAsync(searchDto, userIdInt);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
