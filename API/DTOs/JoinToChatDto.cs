using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class JoinToChatDto
    {
        [Required]public string Gender { get; set; }
        [Required]public string SelectedGender { get; set; }
        public string Location { get; set; }
        public int MinAge { get; set; }
        public string Avatar { get; set; } 
        [Required]public string Nick { get; set; } 
    }
}