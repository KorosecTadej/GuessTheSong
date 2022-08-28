import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';
import { RoomService } from 'src/app/Services/rooms.service';

export interface tableUsers {
  name: string;
  score: number;
}

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
})
export class ScoreBoardComponent implements OnInit {
  public roomId: any;
  public loading: boolean = true;
  public room: any;
  public players: any;
  public users: tableUsers[] = [];

  public displayedColumns: string[] = ['name', 'score'];
  public dataSource;
  constructor(
    public roomService: RoomService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.roomId = this.roomService.getRoomData();

      this.roomService.getRoomFromId(this.roomId).subscribe((response) => {
        if (response.status == 200) {
          this.room = response.body;
          this.players =
            this.room.joinedUsersIds == null
              ? []
              : this.room.joinedUsersIds.split(',');
          this.players = [...new Set(this.players)];
          console.log(this.players);
          for (let user of this.players) {
            this.authService.getUserById(user).subscribe((response) => {
              let user: tableUsers = {
                name: response.body.ime,
                score: response.body.score,
              };
              this.users.push(user);
            });
          }
        }
      });
    }, 1000);

    setTimeout(() => {
      this.dataSource = this.users;
      this.loading = false;
    }, 3000);
  }
}
