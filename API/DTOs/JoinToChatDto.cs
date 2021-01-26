using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class JoinToChatDto
    {
        [Required]public string Gender { get; set; }
        public string SelectedGender { get; set; }
        public string Location { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
    }
}