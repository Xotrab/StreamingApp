using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.DTOs
{
    public class SearchResultDto
    {
        public List<SongDto> Songs { get; set; }

        public List<PlaylistBriefDto> PlaylistBriefs { get; set; }

        public List<ApplicationUserDto> Users { get; set; }
    }
}
