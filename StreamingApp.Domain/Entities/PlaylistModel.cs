using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Domain.Entities
{
    public class PlaylistModel
    {  
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Playbacks { get; set; }

        [Required]
        public ICollection<PlaylistSong> PlaylistSongs { get; set; }

        [Required]
        public int AuthorId { get; set; }

        [Required]
        public ApplicationUser Author { get; set; }

        [Required]
        public ICollection<LikedPlaylist> LikedBy { get; set; }
    }
}
