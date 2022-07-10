using guess_the_song_API.Models;

namespace guess_the_song_API.JWTManager
{
    public interface IJWTManagerRepository
    {
        public Tokens Authenticate(Users users);
    }
}
