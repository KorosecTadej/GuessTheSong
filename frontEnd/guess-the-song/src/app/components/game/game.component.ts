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
  public changeUserValue: number = 0;
  constructor(
    public roomService: RoomService,
    public router: Router,
    public authService: AuthService,
    public signalRService: signalRService,
    public spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    //this.players = [];
    setTimeout(() => {
      this.roomId = this.roomService.getRoomData();

      this.roomService.getRoomFromId(this.roomId).subscribe((response) => {
        if (response.status == 200) {
          this.room = response.body;
          this.NumberOfQuestionsValue = Number(this.room.noOfQuestions);
          this.QuestionTimeValue = Number(this.room.answerTime);
          this.NoOfAnswers = new Array(Number(this.room.noOfAnswers));
          console.log(this.room.joinedUsersIds);
          //this.players.push(JSON.parse(this.room.joinedUsersIds));
          this.players =
            this.room.joinedUsersIds == null
              ? []
              : this.room.joinedUsersIds.split(',');
          this.loading = false;
          this.players = [...new Set(this.players)];
        }
      });
    }, 1000);

    this.userId = this.authService.getUserId();

    setTimeout(() => {
      this.spotifyService
        .getSongs('top10', this.NumberOfQuestionsValue.toString())
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

    setTimeout(() => {
      if (this.userId == this.players[0]) {
        this.currentTrack = this.iterations.tracks[0].preview_url;
        this.currentTrackName = this.iterations.tracks[0].name;
      }
    }, 4000);
  }

  public changeQuestion(nOfQuestion: number) {
    console.log(nOfQuestion);
    this.currentTrack = this.iterations.tracks[nOfQuestion].preview_url;
    this.currentTrackName = this.iterations.tracks[nOfQuestion].name;
    console.log(this.currentTrack);
    this.playerWork = true;
  }

  public answerQuestion(trackName: string): void {
    if (this.currentTrackName == trackName) {
      window.alert('Your answer is correct! :)');
    } else {
      window.alert('Your answer is incorrect! :(');
    }
    this.playerWork = false;
    setTimeout(() => {
      console.log(this.next);
      console.log(this.iterations.tracks.length);
      if (this.next == 4) {
        //this.next == this.NumberOfQuestionsValue
        this.changeUser((this.changeUserValue += 1));
      } else {
        this.changeQuestion((this.next += 1));
      }
    }, 2000);
  }

  public changeUser(changeUserValue: number) {
    if (this.userId == this.players[changeUserValue]) {
      this.next = -1;
    }
  }
}
