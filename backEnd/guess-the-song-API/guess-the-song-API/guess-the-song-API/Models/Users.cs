using System.ComponentModel.DataAnnotations;

namespace guess_the_song_API.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }
        public string Ime { get; set; }
        public string Priimek { get; set; }
        public string Username { get; set; }
        public string Pass { get; set; }
        public int? Score { get; set; }
    }
}
