using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace guess_the_song_API.Models
{
    public class Users
    {
        [Key]
        Guid UserId { get; set; }
        string Ime { get; set; }
        string Priimek { get; set; }
        string Username { get; set; }
        string Pass { get; set; }
    }
}
