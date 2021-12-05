using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.Entities
{
    public class PlaylistSong
    {
        public int PlaylistId { get; set; }
        public PlaylistModel Playlist { get; set; }

        public int SongId { get; set; }
        public SongModel Song { get; set; }
    }
}
