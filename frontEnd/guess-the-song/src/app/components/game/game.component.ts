import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/Models/room.model';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RoomService } from 'src/app/Services/rooms.service';
import { signalRService } from 'src/app/Services/signalR.service';
import { SpotifyService } from 'src/app/Services/spotify.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public room: Room;
  public roomId: number;
  public loading: boolean = true;
  public userId: string;
  public playerWork: boolean = true;

  //SignalR
  public connection: any;

  public players: string[] = [];
  public autoTicks = false;
  public showTicks = false;
  public thumbLabel = false;
  public NumberOfQuestionsValue;
  public QuestionTimeValue;
  public NoOfAnswers;
  public tickInterval = 1;
  public songs: string[] = [];
  public ids: string = '';
  public iterations: any;
  public currentTrack: any;
  public currentTrackName: any;
  public next: number = 0;
  public currentUser: User;
  public endGame: boolean = false;
  public score: number = 0;
  constructor(
    public roomService: RoomService,
    public router: Router,
    public authService: AuthService,
    public signalRService: signalRService,
    public spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.roomId = this.roomService.getRoomData();

      this.roomService.getRoomFromId(this.roomId).subscribe((response) => {
        if (response.status == 200) {
          this.room = response.body;
          this.NumberOfQuestionsValue = Number(this.room.noOfQuestions);
          this.QuestionTimeValue = Number(this.room.answerTime);
          this.NoOfAnswers = new Array(Number(this.room.noOfAnswers));
          this.players =
            this.room.joinedUsersIds == null
              ? []
              : this.room.joinedUsersIds.split(',');
          this.loading = false;
          this.players = [...new Set(this.players)];
          console.log(this.players);
        }
      });
    }, 1000);

    this.userId = this.authService.getUserId();

    this.authService.getUser().subscribe((x) => {
      this.currentUser = x.body;
    });

    setTimeout(() => {
      this.spotifyService
        .getSongs('justinBieber', this.NumberOfQuestionsValue.toString())
        .subscribe((response) => {
          for (let track of response.tracks.items) {
            this.ids += track.data.id + ',';
          }
          this.ids = this.ids.slice(0, -1);
          this.spotifyService.getSongDemo(this.ids).subscribe((response) => {
            this.iterations = response;
          });
        });
    }, 1500);

    this.startGame(0);
  }

  public startGame(player: number): void {
    setTimeout(() => {
      if (this.userId == this.players[player]) {
        this.currentTrack = this.iterations.tracks[0].preview_url;
        this.currentTrackName = this.iterations.tracks[0].name;
      }
    }, 4000);
  }

  public ngAfterViewInit(): void {
    this.signalRService.startConnection();

    if (this.userId != this.players[0]) {
      this.signalRService.receiveChangeUser();
      this.signalRService.getChangeUser().subscribe((player) => {
        this.changeUser(1);
      });
      setTimeout(() => {}, 2000);
    }

    this.signalRService.receiveScore();
    this.signalRService.getScoreObs().subscribe((player) => {
      if (player) {
        this.router.navigate(['home-page/game-settings/game/score-board']);
      }
    });
    setTimeout(() => {}, 2000);
  }

  public changeQuestion(nOfQuestion: number) {
    this.currentTrack = this.iterations.tracks[nOfQuestion].preview_url;
    this.currentTrackName = this.iterations.tracks[nOfQuestion].name;
    this.playerWork = true;
  }

  public answerQuestion(trackName: string): void {
    if (this.currentTrackName == trackName) {
      window.alert('Your answer is correct! :)');
      this.score += 100;
    } else {
      window.alert('Your answer is incorrect! :(');
    }
    this.playerWork = false;
    setTimeout(() => {
      if (this.next >= 4) {
        if (this.endGame == false) {
          if (this.userId == this.players[0]) {
            this.authService
              .updateScore(this.userId, this.score)
              .subscribe((response) => {});
            this.signalRService.sendChangeUser(this.currentUser);
          } else {
            this.authService
              .updateScore(this.userId, this.score)
              .subscribe((response) => {
                if (response.status == 200) {
                  this.signalRService.sendScore(this.currentUser);
                }
              });
          }
        }
      } else {
        this.changeQuestion((this.next += 1));
      }
    }, 2000);
  }

  public changeUser(changeUserValue: number) {
    if (this.userId == this.players[changeUserValue]) {
      this.next = 0;
      this.startGame(changeUserValue);
    }
  }
}
