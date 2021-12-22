using StreamingApp.Shared.Enums;
using System;

namespace StreamingApp.Domain.DTOs
{
    public class SongDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public Genre Genre { get; set; }

        public int Playbacks { get; set; }

        public DateTime AddedOn { get; set; }

        public int Likes { get; set; }

        public ApplicationUserDto Author { get; set; }
    }
}
