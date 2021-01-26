using API.DTOs;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser 
    {
        public int Id {get; set;}
        public string Gender { get; set; }
        public string SelectedGender { get; set; }
        public string Location { get; set; }
        public int AgeFrom { get; set; }
        public int AgeTo { get; set; }
        
    }
}