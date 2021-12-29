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
    }
}
