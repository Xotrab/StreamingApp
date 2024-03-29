﻿using AutoMapper;
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
    public class SongService : ISongService
    {
        private readonly SongRepository mSongRepository;
        private readonly IMapper mMapper;

        public SongService(SongRepository songRepository, IMapper mMapper)
        {
            mSongRepository = songRepository;
            this.mMapper = mMapper;
        }

        public async Task<Response> AddAsync(UploadSongDto uploadSongDto, string url, int userId)
        {
            var model = mMapper.Map<SongModel>(uploadSongDto, opt => 
                { 
                    opt.Items["Url"] = url;
                    opt.Items["AuthorId"] = userId; 
                });

            int result;

            try
            {
                result = await mSongRepository.CreateAsync(model);
            }
            catch (Exception)
            {
                return "Error occured while adding the song".ToResponseFail();
            }

            return result.ToResponseData();
        }

        public async Task<Response> GetUploadedAsync(int userId)
        {
            List<SongModel> result;

            try 
            {
                result = await mSongRepository.GetUploadedAsync(userId);
            }
            catch (Exception)
            {
                return "Error occured while fetching the uploaded".ToResponseFail();
            }

            return mMapper.Map<List<SongDto>>(result, opt =>
            {
                opt.Items["UserId"] = userId;
            }).ToResponseData();
        }

        public async Task<Response> GetLikedSongsAsync(int userId)
        {
            List<SongModel> result;

            try
            {
                result = await mSongRepository.GetLikedSongsAsync(userId);
            }
            catch (Exception)
            {
                return "Error occured while fetching the liked songs".ToResponseFail();
            }

            return mMapper.Map<List<SongDto>>(result, opt =>
            {
                opt.Items["UserId"] = userId;
            }).ToResponseData();
        }

        public async Task<Response> LikeSongAsync(int songId, int userId)
        {
            try
            {
                await mSongRepository.LikeSongAsync(songId, userId);
            }
            catch(Exception)
            {
                return "Error occured while liking the song".ToResponseFail();
            }

            return "Song liked successfully".ToResponseSuccess();
        }

        public async Task<Response> DislikeSongAsync(int songId, int userId)
        {
            try
            {
                await mSongRepository.DislikeSongAsync(songId, userId);
            }
            catch (Exception)
            {
                return "Error occured while disliking the song".ToResponseFail();
            }

            return "Song disliked successfully".ToResponseSuccess();
        }
    }
}
