using StreamingApp.Domain.DTOs;
using StreamingApp.Shared.Responses;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Interfaces
{
    public interface ISongService
    {
        Task<Response> AddAsync(UploadSongDto uploadSongDto, string url, int userId);
        Task<Response> GetUploadedAsync(int userId);
        Task<Response> GetLikedSongsAsync(int userId);
        Task<Response> LikeSongAsync(int songId, int userId);
    }
}
