using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Database.Repositories
{
    public abstract class BaseRepository<T> where T : class
    {
        protected StreamingAppDbContext mDbContext;
        protected abstract DbSet<T> mDbSet { get; }

        public BaseRepository(StreamingAppDbContext dbContext)
        {
            mDbContext = dbContext;
        }

        public async Task<T> GetAsync(int id)
        {
            var result = await mDbSet.FindAsync(id);
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await mDbSet.FindAsync(id);
            mDbSet.Remove(entity);

            return await mDbContext.SaveChangesAsync() > 0;
        }
    }
}
