import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public joinRoomVisible: boolean = false;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  public goToCreateRoom(): void {
    this.router.navigate(['home-page/game-settings']);
  }

  public showJoinRoomInput(): void {
    this.joinRoomVisible == false
      ? (this.joinRoomVisible = true)
      : (this.joinRoomVisible = false);
  }

  public joinRoom(): void {
    this.router.navigate(['home-page/game-settings/game']);
  }
}
