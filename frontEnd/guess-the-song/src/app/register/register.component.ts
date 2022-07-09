import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/user.model';
import { AuthService } from 'src/Services/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public Register(): void {
    let user: User = {
      Ime: this.name,
      Priimek: this.surname,
      Username: this.username,
      Pass: this.password,
    };

    this.authService.createUser(user).subscribe();
  }
}
