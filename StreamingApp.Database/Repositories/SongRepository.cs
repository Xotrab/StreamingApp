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
    }
}
