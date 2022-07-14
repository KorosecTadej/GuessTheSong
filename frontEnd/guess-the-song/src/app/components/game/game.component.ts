import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/Models/room.model';
import { RoomService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public room: Room;
  constructor(public roomService: RoomService) {}

  ngOnInit(): void {}
}
