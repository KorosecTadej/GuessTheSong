import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../Models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  public id: number;
  constructor(public httpClient: HttpClient) {}

  public createRoom(room: Room): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:5198/api/Rooms/`, room, {
      observe: 'response',
    });
  }

  public updateRoom(roomId: number, room: Room): Observable<any> {
    return this.httpClient.put<any>(
      `http://localhost:5198/api/Rooms/${roomId}`,
      room,
      {
        observe: 'response',
      }
    );
  }

  public sendCreatedRoomData(id: number): void {
    this.id = id;
  }

  public getRoomData(): number {
    return this.id;
  }

  public getRoomFromId(roomId: number): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:5198/api/Rooms/${roomId}`,
      {
        observe: 'response',
      }
    );
  }

  public getRoomFromRoomCode(roomCode: string): Observable<any> {
    return this.httpClient.get<any>(
      `http://localhost:5198/api/Rooms/getRoomFromCode/${roomCode}`,
      {
        observe: 'response',
      }
    );
  }
}
