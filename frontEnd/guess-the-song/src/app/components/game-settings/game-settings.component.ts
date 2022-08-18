import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Room } from 'src/app/Models/room.model';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RoomService } from 'src/app/Services/rooms.service';
import { signalRService } from 'src/app/Services/signalR.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  public roomId: number;
  public room: Room;
  public loading: boolean = true;
  public user;

  //SignalR
  public connection: any;

  public players: User[] = [];
  public autoTicks = false;
  public showTicks = false;
  public thumbLabel = false;
  public NumberOfQuestionsValue;
  public QuestionTimeValue;
  public NoOfAnswers;
  public tickInterval = 1;

  constructor(
    public roomService: RoomService,
    public router: Router,
    public authService: AuthService,
    public signalRService: signalRService
  ) {}

  ngOnDestroy(): void {}

  async ngOnInit(): Promise<void> {
    //this.players = [];
    setTimeout(() => {
      this.roomId = this.roomService.getRoomData();

      this.roomService.getRoomFromId(this.roomId).subscribe((response) => {
        if (response.status == 200) {
          this.room = response.body;
          this.NumberOfQuestionsValue = Number(this.room.noOfQuestions);
          this.QuestionTimeValue = Number(this.room.answerTime);
          this.NoOfAnswers = this.room.noOfAnswers;
          //this.players.push(JSON.parse(this.room.joinedUsersIds));
          /*this.players =
            this.room.joinedUsersIds == null
              ? []
              : this.room.joinedUsersIds.split(',');*/
          this.loading = false;
        }
      });
    }, 1000);

    this.authService.getUser().subscribe((response) => {
      this.user = response.body;
    });
  }

  public ngAfterViewInit(): void {
    this.signalRService.startConnection();

    setTimeout(() => {
      this.signalRService.sendPlayerJoin(this.user);

      this.signalRService.receivePlayerJoin();
      this.signalRService.getProfileObs().subscribe((player) => {
        if (!player) return;
        this.players.push(player);
        console.log(this.players);
      });
    }, 2000);
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
