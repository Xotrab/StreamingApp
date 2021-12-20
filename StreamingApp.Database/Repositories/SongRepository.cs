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

        public int Create(SongModel model)
        {
            var result = mDbSet.Add(model);
            Save();
            return result.Entity.Id;
        }
    }
}
