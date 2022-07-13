using guess_the_song_API.Data;
using guess_the_song_API.JWTManager;
using guess_the_song_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        public UsersController(DataContext context, IJWTManagerRepository jWTManager)
        {
            _context = context;
            _jWTManager = jWTManager;
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
            var user = _context.Users.First(x => x.UserId == id);
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Post([FromBody] Users value)
        {
            try
            {
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
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
