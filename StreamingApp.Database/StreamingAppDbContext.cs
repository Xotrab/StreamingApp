using Microsoft.AspNetCore.Identity;
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SongModel>(entity =>
            {
                entity.HasOne(s => s.Author)
                      .WithMany(a => a.Songs)
                      .HasForeignKey(s => s.AuthorId);
            });

            builder.Entity<LikedSong>(entity =>
            {
                entity.HasKey(ls => new { ls.UserId, ls.SongId });

                entity.HasOne(ls => ls.User)
                      .WithMany(u => u.LikedSongs)
                      .HasForeignKey(ls => ls.UserId);

                entity.HasOne(ls => ls.Song)
                      .WithMany(s => s.LikedBy)
                      .HasForeignKey(ls => ls.SongId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<PlaylistSong>(entity => 
            {
                entity.HasKey(ps => new { ps.PlaylistId, ps.SongId });

                entity.HasOne(ps => ps.Playlist)
                      .WithMany(p => p.PlaylistSongs)
                      .HasForeignKey(ps => ps.PlaylistId);

                entity.HasOne(ps => ps.Song)
                      .WithMany(s => s.PlaylistSongs)
                      .HasForeignKey(ps => ps.SongId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<PlaylistModel>(entity =>
            {
                entity.HasOne(p => p.Author)
                      .WithMany(a => a.Playlists)
                      .HasForeignKey(p => p.AuthorId);
            });

            builder.Entity<LikedPlaylist>(entity =>
            {
                entity.HasKey(lp => new { lp.UserId, lp.PlaylistId });

                entity.HasOne(lp => lp.User)
                      .WithMany(u => u.LikedPlaylists)
                      .HasForeignKey(lp => lp.UserId);

                entity.HasOne(lp => lp.Playlist)
                      .WithMany(p => p.LikedBy)
                      .HasForeignKey(lp => lp.PlaylistId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<UserFollow>(entity =>
            {
                entity.HasKey(uf => new { uf.UserId, uf.FollowedId });

                entity.HasOne(uf => uf.User)
                      .WithMany(u => u.Following)
                      .HasForeignKey(uf => uf.UserId);

                entity.HasOne(uf => uf.Followed)
                      .WithMany(u => u.FollowedBy)
                      .HasForeignKey(uf => uf.FollowedId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
