import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/Models/user.model';
import jwt_decode from 'jwt-decode';

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

  public getUser(): Observable<any> {
    let token = localStorage.getItem('token') || '{}';
    let userId: any = jwt_decode(token);
    return this.httpClient.get<any>(
      `http://localhost:5198/api/Users/` + userId.nameid,
      {
        observe: 'response',
      }
    );
  }

  public getUserId(): string {
    let token = localStorage.getItem('token') || '{}';
    let userId: any = jwt_decode(token);
    return userId.nameid;
  }
}
