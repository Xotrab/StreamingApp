using StreamingApp.Database.Repositories;
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
        private readonly SongRepository mSongRepository;

        public SongService(SongRepository songRepository)
        {
            mSongRepository = songRepository;
        }

        public Task<Response> AddAsync(UploadSongDto uploadSongDto)
        {
            throw new NotImplementedException();
        }
    }
}
