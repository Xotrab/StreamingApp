using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Entities
{
    public class UserFollow
    {
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int FollowedId { get; set; }
        public ApplicationUser Followed { get; set; }
    }
}
