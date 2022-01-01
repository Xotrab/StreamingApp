using StreamingApp.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StreamingApp.Domain.DTOs
{
    public class SearchDto
    {
        public string Filter { get; set; }

        public Genre? Genre { get; set; } = null;

        public bool OnlySongs { get; set; }
    }
}
