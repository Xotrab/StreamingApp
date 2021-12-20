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
    public class ApplicationUserMapper
    {
        private readonly IMapper mMapper;

        public ApplicationUserMapper()
        {
            mMapper = new MapperConfiguration(config => 
            {
                config.CreateMap<RegisterDto, ApplicationUser>();

            }).CreateMapper();
        }

        public ApplicationUser Map(RegisterDto registerDto)
        {
            return mMapper.Map<ApplicationUser>(registerDto);
        }
    }
}
