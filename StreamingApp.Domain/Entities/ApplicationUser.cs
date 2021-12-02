using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace StreamingApp.Domain.Entities
{
    public class ApplicationUser : IdentityUser<int>
    {
        public ICollection<SongModel> Songs { get; set; }

        public ICollection<PlaylistModel> Playlists { get; set; }

        public ICollection<LikedSong> LikedSongs { get; set; }

        public ICollection<LikedPlaylist> LikedPlaylists { get; set; }

        public ICollection<UserFollow> Following { get; set; }

        public ICollection<UserFollow> FollowedBy { get; set; }
    }
}
