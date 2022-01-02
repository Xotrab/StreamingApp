using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StreamingApp.Database.Repositories;
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
        private readonly IMapper mMapper;
        private readonly IConfiguration mConfiguration;
        private readonly IMailService mMailService;
        private readonly ApplicationUserRepository mApplicationUserRepository;

        public UserService(
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IConfiguration configuration,
            IMailService mailService,
            ApplicationUserRepository applicationUserRepository
        )
        {
            mUserManager = userManager;
            mMapper = mapper;
            mConfiguration = configuration;
            mMailService = mailService;
            mApplicationUserRepository = applicationUserRepository;
        }

        public async Task<Response> LoginUserAsync(LoginDto loginDto)
        {
            var user = await mUserManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return "Invalid username or password".ToResponseFail();

            if (!user.EmailConfirmed)
                return "The given email address has not been verified yet".ToResponseFail();

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

            var applicationUser = mMapper.Map<ApplicationUser>(registerDto);

            var result = await mUserManager.CreateAsync(applicationUser, registerDto.Password);

            if (result.Succeeded)
            {
                var emailConfirmationToken = await mUserManager.GenerateEmailConfirmationTokenAsync(applicationUser);

                var tokenBytes = Encoding.UTF8.GetBytes(emailConfirmationToken);
                var tokenBase64 = WebEncoders.Base64UrlEncode(tokenBytes);

                string url = $"{mConfiguration["AppUrl"]}/confirm-email?userid={applicationUser.Id}&token={tokenBase64}";

                await mMailService.SendEmailAsync(
                    applicationUser.Email,
                    "Newave streaming app account email confirmation",
                    $"<h1>Welcome to Newave!</h1>" + 
                    $"<p>Please confirm your email address by <a href='{url}'>clicking here</a>.</p>");

                return "Account created successfully".ToResponseSuccess();

            }

            var errors = result.Errors.Select(error => error.Description);

            return "Error occured during account creation".ToResponseErrorList(errors);
        }

        public async Task<Response> ConfirmEmailAsync(string userId, string token)
        {
            var user = await mUserManager.FindByIdAsync(userId);


            if (user == null)
                return "User not found".ToResponseFail();

            var tokenBytes = WebEncoders.Base64UrlDecode(token);
            string tokenString = Encoding.UTF8.GetString(tokenBytes);

            var result = await mUserManager.ConfirmEmailAsync(user, tokenString);

            if (result.Succeeded)
                return "Email confirmed successfuly".ToResponseSuccess();

            var errors = result.Errors.Select(error => error.Description);

            return "Error occured while confirming the email".ToResponseErrorList(errors);
            
        }

        public async Task<Response> GetUserFollowsAsync(int userId)
        {
            List<ApplicationUser> users;
            try
            {
                users = await mApplicationUserRepository.GetUserFollowsAsync(userId);
            }
            catch (Exception)
            {
                return "Error occured while fetching user follows".ToResponseFail();
            }

            return mMapper.Map<List<ApplicationUserDto>>(users, opt =>
            {
                opt.Items["UserId"] = userId;
            }).ToResponseData();
        }

        public async Task<Response> FollowUserAsync(int userId, int followedId)
        {
            try
            {
                await mApplicationUserRepository.FollowUserAsync(userId, followedId);
            }
            catch (Exception)
            {
                return "Error occured while following the user".ToResponseFail();
            }

            return "User followed successfully".ToResponseSuccess();
        }

        public async Task<Response> UnfollowUserAsync(int userId, int followedId)
        {
            try
            {
                await mApplicationUserRepository.UnfollowUserAsync(userId, followedId);
            }
            catch (Exception)
            {
                return "Error occured while unfollowing the user".ToResponseFail();
            }

            return "User unfollowed successfully".ToResponseSuccess();
        }

        private string GenerateJwtToken(ApplicationUser applicationUser)
        {
            var claims = new List<Claim>
            {
                new Claim("email", applicationUser.Email),
                new Claim("id", applicationUser.Id.ToString()),
                new Claim("username", applicationUser.UserName)
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
