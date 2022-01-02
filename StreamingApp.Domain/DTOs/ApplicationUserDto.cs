namespace StreamingApp.Domain.DTOs
{
    public class ApplicationUserDto
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public int NumberOfSongs { get; set; }

        public int NumberOfFollowers { get; set; }
    }
}
