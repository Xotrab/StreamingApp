﻿using StreamingApp.Domain.DTOs;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface ISearchService
    {
        Task<Response> SearchAsync(SearchDto searchDto, int userId);
    }
}
