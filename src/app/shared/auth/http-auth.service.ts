import { AccesTokenParams } from './../models/auth.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';
import { switchMap, take } from 'rxjs/operators';
import { CONFIG } from './config';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private URL = 'https://stormy-plains-57531.herokuapp.com/';

  constructor(private httpClient: HttpClient, private store: Store) {}

  private getToken = (): Observable<string> =>
    this.store.select(getAccessToken).pipe(take(1));

  private getHttpOptions = (): { headers: HttpHeaders } => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  };

  private getLogOutHttpOptions = (): { headers: HttpHeaders } => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
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

  logOut = () =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.post<any>(
          `${this.URL}oauth/revoke?client_id=${CONFIG.client_id}&client_secret=${CONFIG.client_secret}&token=${token}`,
          this.getLogOutHttpOptions()
        );
      })
    );
}

// async logout(): Promise<any> {
//   fetch(
//     `${this.URL}oauth/revoke?client_id=${this.CONFIG.client_id}&client_secret=${
//       this.CONFIG.client_secret
//     }&token=${TOKEN_HANDLER.getToken()}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     }
//   )
//     .then((r) => this.errorHandling({ response: r, message: 'something went wrong, try again' }))
//     .then((response) => this.handleLogout(response))
//     .catch((error) =>
//       this.errorHandling({ response: error, message: 'something went wrong, try again' })
//     );
// }
