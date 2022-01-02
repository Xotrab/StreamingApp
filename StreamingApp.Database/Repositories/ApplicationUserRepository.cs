using Microsoft.EntityFrameworkCore;
using StreamingApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Database.Repositories
{
    public class ApplicationUserRepository : BaseRepository<ApplicationUser>
    {
        protected override DbSet<ApplicationUser> mDbSet => mDbContext.Users;

        public ApplicationUserRepository(StreamingAppDbContext context) : base(context)
        {

        }

        public async Task<List<ApplicationUser>> SearchAsync(string filter)
        {
            return await mDbSet.Include(x => x.Songs)
                               .Include(x => x.FollowedBy)
                               .Where(x => x.UserName.ToLower().Contains(filter.ToLower()))
                               .ToListAsync();
        }

        public async Task<List<ApplicationUser>> GetUserFollowsAsync(int userId)
        {
            var user = await mDbSet.Include(x => x.Following)
                                   .FirstOrDefaultAsync(x => x.Id == userId);

            var followedIds = user.Following.Select(x => x.FollowedId);

            return await mDbSet.Include(x => x.Songs)
                               .Include(x => x.FollowedBy)
                               .Where(x => followedIds.Contains(x.Id))
                               .ToListAsync();
        }

        public async Task FollowUserAsync(int userId, int followedId)
        {
            var user = await mDbSet.Include(x => x.Following)
                                   .FirstOrDefaultAsync(x => x.Id == userId);

            var userFollow = new UserFollow
            {
                UserId = userId,
                FollowedId = followedId
            };

            user.Following.Add(userFollow);
            mDbSet.Update(user);

            await mDbContext.SaveChangesAsync();
        }

        public async Task UnfollowUserAsync(int userId, int followedId)
        {
            var user = await mDbSet.Include(x => x.Following)
                                   .FirstOrDefaultAsync(x => x.Id == userId);

            var userFollow = user.Following.FirstOrDefault(x => x.FollowedId == followedId);

            user.Following.Remove(userFollow);
            mDbSet.Update(user);

            await mDbContext.SaveChangesAsync();
        }
    }
}
