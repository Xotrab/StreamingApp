using AutoMapper;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services.Mappers
{
    public class PlaylistProfile : Profile
    {
        public PlaylistProfile()
        {
            CreateMap<string, PlaylistModel>()
                .ForMember(model => model.Name, x => x.MapFrom(src => src))
                .ForMember(model => model.AuthorId, x => x.MapFrom((src, dst, dstMember, context) => context.Items["AuthorId"]));

            CreateMap<PlaylistModel, PlaylistBriefDto>()
                .ForMember(dto => dto.Likes, x => x.MapFrom(model => model.LikedBy.Count))
                .ForMember(dto => dto.SongIds, x => x.MapFrom(model => model.PlaylistSongs.Select(x => x.SongId)))
                .ForMember(dto => dto.LikedByUser, x => x.MapFrom((src, dst, dstMember, context) => src.LikedBy.Any(x => x.UserId == int.Parse(context.Items["UserId"].ToString()))));

            CreateMap<PlaylistBriefDto, PlaylistDto>()
                .ForMember(dto => dto.Songs, x => x.MapFrom((src, dst, dstMember, context) => context.Items["Songs"]));
        }
    }
}
