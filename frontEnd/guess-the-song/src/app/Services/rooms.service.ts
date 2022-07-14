import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../Models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  public room: Room;
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

  public sendCreatedRoomData(room: Room): void {
    this.room = room;
  }

  public getRoomData(): Room {
    return this.room;
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
