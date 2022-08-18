using guess_the_song_API.Models;
using Microsoft.AspNetCore.SignalR;

public class GameHub : Hub
{
    public async Task JoinRoom(Users user)
    {
        await Clients.All.SendAsync("join_room", user);
    }
}