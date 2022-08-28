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
  userChangeObs$: BehaviorSubject<User> = new BehaviorSubject(null);
  scoreObs$: BehaviorSubject<User> = new BehaviorSubject(null);
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

  //Start game
  public sendStart(user: User): void {
    this.connection.invoke('JoinRoom', user);
  }

  public receiveStart(): any {
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

  //Change user
  public sendChangeUser(user: User): void {
    this.connection.invoke('ChangeUser', user);
  }

  public receiveChangeUser(): any {
    return this.connection.on('change_user', (user) => {
      this.setChangeUser(user);
    });
  }

  setChangeUser(profile: User) {
    this.userChangeObs$.next(profile);
  }

  getChangeUser(): Observable<User> {
    return this.userChangeObs$.asObservable();
  }

  //Goto Score
  public sendScore(user: User): void {
    this.connection.invoke('GoToScore', user);
  }

  public receiveScore(): any {
    return this.connection.on('goto_score', (user) => {
      this.setScoreObs(user);
    });
  }

  getScoreObs(): Observable<User> {
    return this.scoreObs$.asObservable();
  }

  setScoreObs(profile: User) {
    this.scoreObs$.next(profile);
  }
}
