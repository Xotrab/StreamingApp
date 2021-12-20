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
    public class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<UploadSongDto, SongModel>()
                .ForMember(model => model.Name, x => x.MapFrom(dto => dto.File.FileName))
                .ForMember(model => model.Url, x => x.MapFrom((src, dst, dstMember, context) => context.Items["Url"]))
                .ForMember(model => model.AuthorId, x => x.MapFrom((src, dst, dstMember, context) => context.Items["AuthorId"]))
                .ForMember(model => model.AddedOn, x => x.MapFrom(_ => DateTime.Now));
        }
    }
}
