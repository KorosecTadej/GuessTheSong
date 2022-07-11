import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isUserLoggedIn: boolean | undefined;
  public username: string | undefined | null;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();

    this.authService.getUser().subscribe((response) => {
      //console.log(response.body.username);
      this.username = response.body.username;
    });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
