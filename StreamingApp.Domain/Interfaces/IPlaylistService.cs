﻿using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface IPlaylistService
    {
        Task<Response> CreateAsync(string playlistName, int userId);
    }
}
