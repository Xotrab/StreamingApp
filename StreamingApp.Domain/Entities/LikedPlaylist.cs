using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Entities
{
    public class LikedPlaylist
    {
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int PlaylistId { get; set; }
        public PlaylistModel Playlist { get; set; }
    }
}
