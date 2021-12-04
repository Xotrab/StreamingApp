using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Entities;
using StreamingApp.Domain.Interfaces;
using StreamingApp.Services.Mappers;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> mUserManager;
        private readonly ApplicationUserMapper mApplicationUserMapper;

        public UserService(
            UserManager<ApplicationUser> userManager,
            ApplicationUserMapper applicationUserMapper)
        {
            mUserManager = userManager;
            mApplicationUserMapper = applicationUserMapper;
        }

        public async Task<Response> RegisterUserAsync(RegisterDto registerDto)
        {
            if (registerDto.Password != registerDto.ConfirmPassword)
                return "Password mismatch".ToResponseFail();

            var applicationUser = mApplicationUserMapper.Map(registerDto);

            var result = await mUserManager.CreateAsync(applicationUser, registerDto.Password);

            if(result.Succeeded)
            {
                return "Account created successfully".ToResponseSuccess();

            }

            var errors = result.Errors.Select(error => error.Description);

            return "Error occured during account creation".ToResponseErrorList(errors);
        }
    }
}
