using AutoMapper;
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
        }
    }
}
