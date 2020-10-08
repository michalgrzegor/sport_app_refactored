import { AccesTokenParams } from './../models/auth.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private URL = 'https://stormy-plains-57531.herokuapp.com/';

  constructor(private httpClient: HttpClient) {}

  private getHttpOptions = (): { headers: HttpHeaders } => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  };

  getAccesToken = (body: AccesTokenParams): Observable<any> =>
    this.httpClient.post<any>(
      `${this.URL}oauth/token`,
      body,
      this.getHttpOptions()
    );
}
