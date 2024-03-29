﻿using AutoMapper;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services.Mappers
{
    public class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<UploadSongDto, SongModel>()
                .ForMember(model => model.Name, x => x.MapFrom(dto => Path.GetFileNameWithoutExtension(dto.File.FileName)))
                .ForMember(model => model.Url, x => x.MapFrom((src, dst, dstMember, context) => context.Items["Url"]))
                .ForMember(model => model.AuthorId, x => x.MapFrom((src, dst, dstMember, context) => context.Items["AuthorId"]))
                .ForMember(model => model.AddedOn, x => x.MapFrom(_ => DateTime.Now));

            CreateMap<SongModel, SongDto>()
                .ForMember(dto => dto.Likes, x => x.MapFrom(model => model.LikedBy.Count))
                .ForMember(dto => dto.LikedByUser, x => x.MapFrom((src, dst, dstMember, context) => src.LikedBy.Any(x => x.UserId == int.Parse(context.Items["UserId"].ToString()))));
        }
    }
}
