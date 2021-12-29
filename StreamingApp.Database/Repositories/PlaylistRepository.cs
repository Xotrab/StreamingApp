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
    }
}
