using guess_the_song_API.Data;
using guess_the_song_API.JWTManager;
using guess_the_song_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using BCryptNet = BCrypt.Net.BCrypt;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace guess_the_song_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IJWTManagerRepository _jWTManager;
        private readonly IHubContext<GameHub> gameHub;

        public UsersController(DataContext context, IJWTManagerRepository jWTManager, IHubContext<GameHub> gameHub)
        {
            _context = context;
            _jWTManager = jWTManager;
            this.gameHub = gameHub;
        }
        // GET: api/<UsersController>
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            return Ok(_context.Users);
        }

        // GET api/<UsersController>/5
        [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var user = GetUser(id);
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Post([FromBody] Users value)
        {
            try
            {
                value.Pass = BCryptNet.HashPassword(value.Pass);
                _context.Users.Add(value);
                await _context.SaveChangesAsync();

                return Ok(value);
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST api/<UsersController>
        [HttpPost]
        [Route("authenticate")]
        [AllowAnonymous]
        public async Task<ActionResult> Authenticate([FromBody] Users value)
        {
            var token = _jWTManager.Authenticate(value);

            if (token == null) return Unauthorized();

            return Ok(token);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task updateScoreAsync(string id, [FromBody] int score)
        {
            var user = GetUser(Int32.Parse(id));
            user.Score = score;
            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        public Users GetUser(int id)
        {
            return _context.Users.First(x => x.UserId == id);
        }

    }
}
