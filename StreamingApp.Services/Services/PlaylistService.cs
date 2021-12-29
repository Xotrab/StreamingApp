using AutoMapper;
using StreamingApp.Database.Repositories;
using StreamingApp.Domain.Entities;
using StreamingApp.Domain.Interfaces;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly PlaylistRepository mPlaylistRepository;
        private readonly IMapper mMapper;

        public PlaylistService(PlaylistRepository playlistRepository, IMapper mapper)
        {
            mPlaylistRepository = playlistRepository;
            mMapper = mapper;
        }

        public async Task<Response> CreateAsync(string playlistName, int userId)
        {
            var model = mMapper.Map<PlaylistModel>(playlistName, opt =>
                {
                    opt.Items["AuthorId"] = userId;
                });

            int result;

            try
            {
                result = await mPlaylistRepository.CreateAsync(model);
            }
            catch (Exception)
            {
                return "Error occured while creating the playlist".ToResponseFail();
            }

            return result.ToResponseData();
        }
    }
}
