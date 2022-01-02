using StreamingApp.Domain.DTOs;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface IUserService
    {
        Task<Response> RegisterUserAsync(RegisterDto registerDto);

        Task<Response> LoginUserAsync(LoginDto loginDto);

        Task<Response> ConfirmEmailAsync(string userId, string token);

        Task<Response> FollowUserAsync(int userId, int followedId);

        Task<Response> UnfollowUserAsync(int userId, int followedId);

        Task<Response> GetUserFollowsAsync(int userId);
    }
}
