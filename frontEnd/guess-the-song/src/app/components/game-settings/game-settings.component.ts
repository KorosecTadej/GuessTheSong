import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Models/room.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RoomService } from 'src/app/Services/rooms.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit, AfterViewInit {
  public room: Room;

  public players: any[] = [];
  public autoTicks = false;
  public showTicks = false;
  public thumbLabel = false;
  public NumberOfQuestionsValue = 5;
  public QuestionTimeValue = 10;
  public NoOfAnswers;
  public tickInterval = 1;

  constructor(
    public roomService: RoomService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    this.room = this.roomService.getRoomData();
  }

  public getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  public isAdmin(): boolean {
    if (this.room.adminId == this.authService.getUserId().toString())
      return true;
    return false;
  }

  public startGame(): void {
    let updateRoom: Room = {
      roomId: this.room.roomId,
      joinedUsersIds: this.players.toString(),
      adminId: this.room.adminId,
      noOfQuestions: this.NumberOfQuestionsValue.toString(),
      answerTime: this.QuestionTimeValue.toString(),
      noOfAnswers: this.NoOfAnswers,
      roomCode: this.room.roomCode,
    };

    this.roomService
      .updateRoom(updateRoom.roomId, updateRoom)
      .subscribe((response) => {
        if (response.status == 204) {
          this.router.navigate(['home-page/game-settings/game']);
        }
      });
  }
}
