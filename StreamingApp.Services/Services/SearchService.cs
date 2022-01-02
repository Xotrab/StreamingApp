using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
    public class SearchService : ISearchService
    {
        private readonly SongRepository mSongRepository;
        private readonly PlaylistRepository mPlaylistRepository;
        private readonly ApplicationUserRepository mApplicationUserRepository;
        private readonly IMapper mMapper;

        public SearchService(
            SongRepository songRepository,
            PlaylistRepository playlistRepository,
            ApplicationUserRepository applicationUserRepository,
            IMapper mapper
        )
        {
            mSongRepository = songRepository;
            mPlaylistRepository = playlistRepository;
            mApplicationUserRepository = applicationUserRepository;
            mMapper = mapper;
        }

        public async Task<Response> SearchAsync(SearchDto searchDto, int userId)
        {
            List<SongModel> songs;
            List<PlaylistModel> playlists;
            List<ApplicationUser> users;

            var result = new SearchResultDto();

            try
            {
                songs = await mSongRepository.SearchAsync(searchDto);
            }
            catch (Exception)
            {
                return "Error occured while searching for songs".ToResponseFail();
            }

            result.Songs = mMapper.Map<List<SongDto>>(songs, opt =>
            {
                opt.Items["UserId"] = userId;
            });

            if (searchDto.OnlySongs)
            {
                return result.ToResponseData();
            }

            try
            {
                playlists = await mPlaylistRepository.SearchAsync(searchDto.Filter);
            }
            catch (Exception)
            {
                return "Error occured while searching for playlists".ToResponseFail();
            }

            result.PlaylistBriefs = mMapper.Map<List<PlaylistBriefDto>>(playlists, opt =>
            {
                opt.Items["UserId"] = userId;
            });

            try
            {
                users = await mApplicationUserRepository.SearchAsync(searchDto.Filter);
            }
            catch (Exception)
            {
                return "Error occured while searching for users".ToResponseFail();
            }

            result.Users = mMapper.Map<List<ApplicationUserDto>>(users);

            return result.ToResponseData();
        }
    }
}
