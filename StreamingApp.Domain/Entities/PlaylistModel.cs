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
        public ICollection<SongModel> Songs { get; set; }

        [Required]
        public int AuthorId { get; set; }

        [Required]
        public ApplicationUser Author { get; set; }

        [Required]
        public ICollection<ApplicationUser> LikedBy { get; set; }
    }
}
