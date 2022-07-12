using guess_the_song_API.Data;
using guess_the_song_API.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace guess_the_song_API.JWTManager
{
    public class JWTManagerRepository : IJWTManagerRepository
    {
        private readonly IConfiguration iconfiguration;
        private readonly DataContext _context;
        public JWTManagerRepository(IConfiguration iconfiguration, DataContext context)
        {
            this.iconfiguration = iconfiguration;
            _context = context;
        }
        public Tokens Authenticate(Users users)
        {
            if (!_context.Users.Any(x => x.Username == users.Username && x.Pass == users.Pass))
            {
                return null;
            }
            var user = _context.Users.First(x => x.Username == users.Username && x.Pass == users.Pass);

            // Else we generate JSON Web Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Tokens { Token = tokenHandler.WriteToken(token) };

        }
    }
}
