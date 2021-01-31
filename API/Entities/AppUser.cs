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
        public int MinAge { get; set; }
        public bool IsChatting { get; set; } = false;
        public string GroupName { get; set; }

    }
}