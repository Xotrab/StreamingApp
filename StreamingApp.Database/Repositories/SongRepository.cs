using Microsoft.EntityFrameworkCore;
using StreamingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Database.Repositories
{
    public class SongRepository : BaseRepository<SongModel>
    {
        protected override DbSet<SongModel> mDbSet => mDbContext.Songs;

        public SongRepository(StreamingAppDbContext context) : base(context)
        {
                
        }

        public async Task<int> CreateAsync(SongModel model)
        {
            var result =  await mDbSet.AddAsync(model);
            await mDbContext.SaveChangesAsync();

            return result.Entity.Id;
        }

        public async Task<List<SongModel>> GetUploadedAsync(int userId) 
        {
            return await mDbSet.Include(x => x.Author)
                               .Include(x => x.LikedBy)
                               .Where(x => x.AuthorId == userId)
                               .ToListAsync();
        }

        public async Task<List<SongModel>> GetLikedSongsAsync(int userId)
        {
            return await mDbSet.Include(x => x.Author)
                               .Include(x => x.LikedBy)
                               .Where(x => x.LikedBy.Any(x => x.UserId == userId))
                               .ToListAsync();
        }

        public async Task LikeSongAsync(int songId, int userId)
        {
            var song = await mDbSet.Include(x => x.LikedBy)
                                   .FirstOrDefaultAsync(x => x.Id == songId);

            var likedSong = new LikedSong 
            {
                UserId = userId,
                SongId = songId,
            };

            song.LikedBy.Add(likedSong);

            mDbSet.Update(song);
            await mDbContext.SaveChangesAsync();
        }
    }
}
