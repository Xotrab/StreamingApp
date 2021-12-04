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
    }
}
