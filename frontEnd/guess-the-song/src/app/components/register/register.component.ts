import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public name: string = '';
  public surname: string = '';
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public repeatedPassword: string = '';

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  public Register(): void {
    if (this.password != this.repeatedPassword) return;

    let user: User = {
      Ime: this.name,
      Priimek: this.surname,
      Username: this.username,
      Pass: this.password,
    };

    this.authService.createUser(user).subscribe((response) => {
      if (response.status == 200) this.router.navigate(['login']);
    });
  }
}
