﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StreamingApp.Domain.DTOs;
using StreamingApp.Domain.Entities;
using StreamingApp.Domain.Interfaces;
using StreamingApp.Services.Mappers;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> mUserManager;
        private readonly ApplicationUserMapper mApplicationUserMapper;
        private readonly IConfiguration mConfiguration;

        public UserService(
            UserManager<ApplicationUser> userManager,
            ApplicationUserMapper applicationUserMapper,
            IConfiguration configuration)
        {
            mUserManager = userManager;
            mApplicationUserMapper = applicationUserMapper;
            mConfiguration = configuration;
        }

        public async Task<Response> LoginUserAsync(LoginDto loginDto)
        {
            var user = await mUserManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return "Invalid username or password".ToResponseFail();

            var isPasswordValid = await mUserManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordValid)
                return "Invalid username or password".ToResponseFail();

            var token = GenerateJwtToken(user);

            return token.ToResponseData();
        }

        public async Task<Response> RegisterUserAsync(RegisterDto registerDto)
        {
            if (registerDto.Password != registerDto.ConfirmPassword)
                return "Password mismatch".ToResponseFail();

            var applicationUser = mApplicationUserMapper.Map(registerDto);

            var result = await mUserManager.CreateAsync(applicationUser, registerDto.Password);

            if (result.Succeeded)
            {
                return "Account created successfully".ToResponseSuccess();

            }

            var errors = result.Errors.Select(error => error.Description);

            return "Error occured during account creation".ToResponseErrorList(errors);
        }

        private string GenerateJwtToken(ApplicationUser applicationUser)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, applicationUser.Email),
                new Claim(ClaimTypes.NameIdentifier, applicationUser.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(mConfiguration["TokenValidationKey"]));

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)

                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}