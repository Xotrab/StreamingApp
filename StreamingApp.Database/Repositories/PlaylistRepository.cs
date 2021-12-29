using Microsoft.EntityFrameworkCore;
using StreamingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Database.Repositories
{
    public class PlaylistRepository : BaseRepository<PlaylistModel>
    {
        protected override DbSet<PlaylistModel> mDbSet => mDbContext.Playlists;

        public PlaylistRepository(StreamingAppDbContext context) : base(context)
        {

        }

        public async Task<int> CreateAsync(PlaylistModel model)
        {
            var result = await mDbSet.AddAsync(model);
            await mDbContext.SaveChangesAsync();

            return result.Entity.Id;
        }

        public async Task<PlaylistModel> GetBriefAsync(int playlistId)
        {
            return await mDbSet.Include(x => x.Author)
                               .Include(x => x.LikedBy)
                               .Include(x => x.PlaylistSongs)
                               .FirstOrDefaultAsync(x => x.Id == playlistId);
        }

        public async Task<bool> RemoveUserPlaylist(int playlistId, int userId)
        {
            var entity = await mDbSet.FindAsync(playlistId);

            if (entity.AuthorId != userId)
                return false;

            mDbSet.Remove(entity);
            return await mDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> AddSongAsync(int playlistId, int songId, int userId)
        {
            var playlist = await mDbSet.Include(x => x.PlaylistSongs)
                                       .FirstOrDefaultAsync(x => x.Id == playlistId && x.AuthorId == userId);

            if (playlist == null)
            {
                return false;
            }

            var playlistSong = new PlaylistSong
            {
                PlaylistId = playlistId,
                SongId = songId
            };

            playlist.PlaylistSongs.Add(playlistSong);
            mDbSet.Update(playlist);

            return await mDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveSongAsync(int playlistId, int songId, int userId)
        {
            var playlist = await mDbSet.Include(x => x.PlaylistSongs)
                                       .FirstOrDefaultAsync(x => x.Id == playlistId && x.AuthorId == userId);

            if (playlist == null)
            {
                return false;
            }

            var playlistSong = playlist.PlaylistSongs.FirstOrDefault(x => x.SongId == songId);

            if (playlistSong == null)
            {
                return false;
            }

            playlist.PlaylistSongs.Remove(playlistSong);
            mDbSet.Update(playlist);

            return await mDbContext.SaveChangesAsync() > 0;
        }

        public async Task RemoveAllPlaylistSongs(int playlistId, int userId)
        {
            var playlist = await mDbSet.Include(x => x.PlaylistSongs)
                                       .FirstOrDefaultAsync(x => x.Id == playlistId && x.AuthorId == userId);

            playlist.PlaylistSongs.Clear();
            mDbSet.Update(playlist);

            await mDbContext.SaveChangesAsync();
        }

        public async Task LikePlaylistAsync(int playlistId, int userId)
        {
            var playlist = await mDbSet.Include(x => x.LikedBy)
                                       .FirstOrDefaultAsync(x => x.Id == playlistId);

            var likedPlaylist = new LikedPlaylist
            {
                PlaylistId = playlistId,
                UserId = userId
            };

            playlist.LikedBy.Add(likedPlaylist);
            mDbSet.Update(playlist);

            await mDbContext.SaveChangesAsync();
        }

        public async Task DislikePlaylistAsync(int playlistId, int userId)
        {
            var playlist = await mDbSet.Include(x => x.LikedBy)
                                       .FirstOrDefaultAsync(x => x.Id == playlistId);

            var likedPlaylist = playlist.LikedBy.FirstOrDefault(x => x.UserId == userId);

            playlist.LikedBy.Remove(likedPlaylist);
            mDbSet.Update(playlist);

            await mDbContext.SaveChangesAsync();
        }
    }
}
