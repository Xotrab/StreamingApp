using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Entities
{
    public class LikedSong
    {
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int SongId { get; set; }
        public SongModel Song { get; set; }
    }
}
