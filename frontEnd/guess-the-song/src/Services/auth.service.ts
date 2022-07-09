import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public httpClient: HttpClient) {}

  public createUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:5198/api/Users/`, user);
  }
}
