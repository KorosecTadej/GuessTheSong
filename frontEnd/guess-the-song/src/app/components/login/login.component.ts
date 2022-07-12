import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {}

  public goToRegister(): void {
    this.router.navigate(['register']);
  }

  public login(): void {
    let user: User = {
      Ime: '',
      Priimek: '',
      Username: this.username,
      Pass: this.password,
    };

    this.authService.authorize(user).subscribe((response) => {
      if (response.status == 200) {
        localStorage.setItem('token', response.body.token);
        this.router.navigate(['home-page']);
      }
    });
  }
}
