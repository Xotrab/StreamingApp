using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.DTOs
{
    public class PlaylistBriefDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<int> SongIds { get; set; }

        public int Playbacks { get; set; }

        public int Likes { get; set; }

        public bool LikedByUser { get; set; }

        public ApplicationUserDto Author { get; set; }
    }
}
