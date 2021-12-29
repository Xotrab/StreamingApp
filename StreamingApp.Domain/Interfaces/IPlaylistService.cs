using StreamingApp.Domain.DTOs;
using StreamingApp.Shared.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface IPlaylistService
    {
        Task<Response> CreateAsync(string playlistName, int userId);
        Task<Response<PlaylistBriefDto>> GetBriefAsync(int playlistId, int userId);
        Task<Response> GetDetailedAsync(PlaylistBriefDto briefDto, int userId);
        Task<Response> RemoveAsync(int playlistId, int userId);
        Task<Response> AddSongAsync(int playlistId, int songId, int userId);
    }
}
