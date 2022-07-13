using System.ComponentModel.DataAnnotations;

namespace guess_the_song_API.Models
{
    public class Rooms
    {
        [Key]
        public int RoomId { get; set; }
        public string JoinedUsersIds { get; set; }
        public string AdminId { get; set; }
        public string NoOfQuestions { get; set; }
        public string AnswerTime { get; set; }
        public string NoOfAnswers { get; set; }
        public string RoomCode { get; set; }
    }
}
