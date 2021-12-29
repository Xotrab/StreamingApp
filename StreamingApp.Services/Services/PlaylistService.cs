using AutoMapper;
using StreamingApp.Database.Repositories;
using StreamingApp.Domain.DTOs;
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
        private readonly SongRepository mSongRepository;
        private readonly IMapper mMapper;

        public PlaylistService(PlaylistRepository playlistRepository, IMapper mapper, SongRepository songRepository)
        {
            mPlaylistRepository = playlistRepository;
            mMapper = mapper;
            mSongRepository = songRepository;
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

        public async Task<Response<PlaylistBriefDto>> GetBriefAsync(int playlistId, int userId)
        {
            PlaylistModel result;

            try
            {
                result = await mPlaylistRepository.GetBriefAsync(playlistId);
            }
            catch (Exception)
            {
                return new Response<PlaylistBriefDto>
                {
                    Success = false,
                    Message = "Error occured while fetching the playlist brief"
                };
            }

            return mMapper.Map<PlaylistBriefDto>(result, opt =>
               {
                   opt.Items["UserId"] = userId;
               }).ToResponseData();            
        }

        public async Task<Response> GetDetailedAsync(PlaylistBriefDto briefDto, int userId)
        {
            List<SongModel> result;

            if (briefDto == null)
            {
                return "Playlist not found".ToResponseFail();
            }

            try
            {
                result = await mSongRepository.GetSongs(briefDto.SongIds);
            }
            catch (Exception)
            {
                return "Error occured while fetching playlist songs".ToResponseFail();
            }

            var songDtos = mMapper.Map<List<SongDto>>(result, opt => 
                {
                    opt.Items["UserId"] = userId;
                });

            return mMapper.Map<PlaylistDto>(briefDto, opt =>
            {
                opt.Items["Songs"] = songDtos;
            }).ToResponseData();
        }

        public async Task<Response> RemoveAsync(int playlistId, int userId)
        {
            try
            {
                await mPlaylistRepository.RemoveUserPlaylist(playlistId, userId);
            }
            catch (Exception)
            {
                return "Error occured while removing the playlist".ToResponseFail();
            }

            return "Playlist removed succesfully".ToResponseSuccess();
        }

        public async Task<Response> AddSongAsync(int playlistId, int songId, int userId)
        {
            bool result;
            try
            {
                result = await mPlaylistRepository.AddSongAsync(playlistId, songId, userId);
            }
            catch (Exception)
            {
                return "Error occured while adding the song to the playlist".ToResponseFail();
            }

            if (!result)
            {
                return "Error occured while adding the song to the playlist".ToResponseFail();
            }

            return "Successfully added the song to the playlist".ToResponseSuccess();
        }

        public async Task<Response> RemoveSongAsync(int playlistId, int songId, int userId)
        {
            bool result;
            try
            {
                result = await mPlaylistRepository.RemoveSongAsync(playlistId, songId, userId);
            }
            catch (Exception)
            {
                return "Error occured while removing the song from the playlist".ToResponseFail();
            }

            if (!result)
            {
                return "Error occured while removing the song from the playlist".ToResponseFail();
            }

            return "Successfully removed the song from the playlist".ToResponseSuccess();
        }
    }
}
