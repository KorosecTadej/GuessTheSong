import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(public httpClient: HttpClient) {}

  public getSongs(search: string, noOfQuestions: string): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-RapidAPI-Key': '***************************************',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      observe: 'response',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.httpClient.get<any>(
      `https://spotify23.p.rapidapi.com/search/?q=${search}&type=tracks&offset=0&limit=${noOfQuestions}&numberOfTopResults=5`,
      requestOptions
    );
  }

  public getSongDemo(search: string): Observable<any> {
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-RapidAPI-Key': 'f369b06c3dmsh5f0a33198674d87p1e8564jsnec5dc3e0b0d0',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
      observe: 'response',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.httpClient.get<any>(
      `https://spotify23.p.rapidapi.com/tracks/?ids=${search}`,
      requestOptions
    );
  }
}
