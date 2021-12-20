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

        public void Save()
        {
            try
            {
                mDbContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<T> Get(int id)
        {
            var result = await mDbSet.FindAsync(id);
            return result;
        }
    }
}
