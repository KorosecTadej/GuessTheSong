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

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
