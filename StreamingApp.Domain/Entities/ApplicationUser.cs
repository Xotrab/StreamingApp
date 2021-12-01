using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace StreamingApp.Domain.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public ICollection<SongModel> Songs { get; set; }

        public ICollection<PlaylistModel> Playlists { get; set; }

        public ICollection<SongModel> LikedSongs { get; set; }

        public ICollection<PlaylistModel> LikedPlaylists { get; set; }

        public ICollection<ApplicationUser> Followed { get; set; }
    }
}
