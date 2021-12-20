using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Interfaces;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services
{
    public class SongService : ISongService
    {
        public Task<Response> AddAsync(UploadSongDto uploadSongDto)
        {
            throw new NotImplementedException();
        }
    }
}
