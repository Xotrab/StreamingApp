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
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<RegisterDto, ApplicationUser>();

            CreateMap<ApplicationUser, ApplicationUserDto>()
                .ForMember(dto => dto.NumberOfSongs, x => x.MapFrom(model => model.Songs.Count))
                .ForMember(dto => dto.NumberOfFollowers, x => x.MapFrom(model => model.FollowedBy.Count))
                .ForMember(dto => dto.FollowedByUser, x => x.MapFrom(
                    (src, dst, dstMember, context) => 
                        src.FollowedBy != null && src.FollowedBy.Any(
                            x => x.UserId == int.Parse(context.Items["UserId"].ToString()))
                        )
                );
        }
    }
}
