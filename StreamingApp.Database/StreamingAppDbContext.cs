﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Domain.Entities;

namespace StreamingApp.Database
{
    public class StreamingAppDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public StreamingAppDbContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<SongModel> Songs { get; set; }

        public DbSet<PlaylistModel> Playlists { get; set; }
    }
}
