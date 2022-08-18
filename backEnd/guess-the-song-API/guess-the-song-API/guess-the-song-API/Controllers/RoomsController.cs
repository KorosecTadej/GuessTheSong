using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using guess_the_song_API.Data;
using guess_the_song_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace guess_the_song_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    public class RoomsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IHubContext<GameHub> gameHub;

        public RoomsController(DataContext context, IHubContext<GameHub> gameHub)
        {
            _context = context;
            this.gameHub = gameHub;
        }

        // GET: api/Rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rooms>>> GetRooms()
        {
          if (_context.Rooms == null)
          {
              return NotFound();
          }
            return await _context.Rooms.ToListAsync();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rooms>> GetRooms(int id)
        {
          if (_context.Rooms == null)
          {
              return NotFound();
          }
            var rooms = await _context.Rooms.FindAsync(id);

            if (rooms == null)
            {
                return NotFound();
            }

            return rooms;
        }

        // GET: api/Rooms/5
        [HttpGet]
        [Route("getRoomFromCode/{id}")]
        public async Task<ActionResult<Rooms>> GetRoomFromCode(string id)
        {
            if (_context.Rooms == null)
            {
                return NotFound();
            }
            var rooms = await _context.Rooms.FirstAsync(x => x.RoomCode == id);

            if (rooms == null)
            {
                return NotFound();
            }

            return rooms;
        }

        // PUT: api/Rooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRooms(int id, Rooms rooms)
        {
            if (id != rooms.RoomId)
            {
                return BadRequest();
            }

            _context.Entry(rooms).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Rooms>> PostRooms(Rooms rooms)
        {
          if (_context.Rooms == null)
          {
              return Problem("Entity set 'DataContext.Rooms'  is null.");
          }
            _context.Rooms.Add(rooms);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRooms", new { id = rooms.RoomId }, rooms);
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRooms(int id)
        {
            if (_context.Rooms == null)
            {
                return NotFound();
            }
            var rooms = await _context.Rooms.FindAsync(id);
            if (rooms == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(rooms);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoomsExists(int id)
        {
            return (_context.Rooms?.Any(e => e.RoomId == id)).GetValueOrDefault();
        }
    }
}
