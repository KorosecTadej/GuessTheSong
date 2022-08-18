import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { User } from '../Models/user.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class signalRService {
  connection: signalR.HubConnection;
  connectionId: string;
  profileObs$: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(public httpClient: HttpClient) {}

  public startConnection(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('http://localhost:5198/game', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public sendPlayerJoin(user: User): void {
    this.connection.invoke('JoinRoom', user);
  }

  public receivePlayerJoin(): any {
    return this.connection.on('join_room', (user) => {
      this.setProfileObs(user);
    });
  }

  getProfileObs(): Observable<User> {
    return this.profileObs$.asObservable();
  }

  setProfileObs(profile: User) {
    this.profileObs$.next(profile);
  }
}
