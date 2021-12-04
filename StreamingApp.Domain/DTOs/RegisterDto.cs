using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Domain.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(20)]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(25)]
        public string Password { get; set; }

        [Required]
        [MaxLength(25)]
        public string ConfirmPassword { get; set; }
    }
}
