using guess_the_song_API.Models;
using Microsoft.AspNetCore.SignalR;

public class GameHub : Hub
{
    public async Task JoinRoom(Users user)
    {
        await Clients.All.SendAsync("join_room", user);
    }

    public async Task ChangeUser(Users user)
    {
        await Clients.Others.SendAsync("change_user");
    }

    public async Task GoToScore(Users user)
    {
        await Clients.All.SendAsync("goto_score", user);
    }
}