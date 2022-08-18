import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Models/room.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RoomService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public joinRoomVisible: boolean = false;
  public roomCode: string;

  constructor(
    public router: Router,
    public roomService: RoomService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  public goToCreateRoom(): void {
    let room: Room = {
      joinedUsersIds: null, //JSON.stringify(this.authService.getUser()),
      adminId: this.authService.getUserId(),
      noOfQuestions: '5',
      answerTime: '10',
      noOfAnswers: '4',
      roomCode: (Math.random() + 1).toString(36).substring(5),
    };

    this.roomService.createRoom(room).subscribe((response) => {
      if (response.status == 201) {
        this.roomService.sendCreatedRoomData(response.body.roomId);
        this.router.navigate(['home-page/game-settings']);
      }
    });
  }

  public showJoinRoomInput(): void {
    this.joinRoomVisible == false
      ? (this.joinRoomVisible = true)
      : (this.joinRoomVisible = false);
  }

  public joinRoom(): void {
    this.roomService
      .getRoomFromRoomCode(this.roomCode)
      .subscribe((response) => {
        if (response.status == 200) {
          this.roomService.sendCreatedRoomData(response.body.roomId);
          this.router.navigate(['home-page/game-settings']);
        }
      });
  }
}
