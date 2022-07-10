import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public httpClient: HttpClient) {}

  public createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:5198/api/Users/`, user, {
      observe: 'response',
    });
  }

  public authorize(user: User): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:5198/api/Users/authenticate/`,
      user,
      {
        observe: 'response',
      }
    );
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
