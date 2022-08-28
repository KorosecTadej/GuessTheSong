import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isUserLoggedIn: boolean | undefined;
  public username: string | undefined | null;

  constructor(
    public authService: AuthService,
    public router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();

    this.authService.getUser().subscribe((response) => {
      this.username = response.body.username;
    });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public back(): void {
    this._location.back();
  }
}
