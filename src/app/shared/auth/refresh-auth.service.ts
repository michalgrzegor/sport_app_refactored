import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { getTime } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuccessfulAccesToken } from '../models/auth.interface';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class RefreshAuthService {
  private CONFIG = {
    client_id: '47IJONQpYYxJa9SfynWN2Fgh7dJ4mvA-wDqHLF-RLSo',
    redirect_uri: 'http://localhost:4200/redirect',
    authorization_endpoint: 'oauth/authorize',
    token_endpoint: 'oauth/token',
    requested_scopes: 'openid',
    client_secret: 'GMaLKm0YXWuKKQiqNN9qhPv5np2yVlgI_9rCuaky2CI',
  };
  private URL = 'https://stormy-plains-57531.herokuapp.com/';

  constructor(private httpClient: HttpClient, private store: Store) {}

  private getHttpOptions = (): { headers: HttpHeaders } => ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  });

  private getParams = () => ({
    grant_type: 'refresh_token',
    client_id: this.CONFIG.client_id,
    redirect_uri: this.CONFIG.redirect_uri,
    client_secret: this.CONFIG.client_secret,
    refresh_token: localStorage.getItem('refresh_token'),
  });

  public checkRefreshToken = (): boolean =>
    localStorage.getItem('refresh_token') &&
    Number(localStorage.getItem('refresh_token_created_at')) * 1000 +
      Number(localStorage.getItem('refresh_token_expired_time')) * 1000 >
      getTime(new Date());

  public makeRefreshTokenRequest = (): Observable<SuccessfulAccesToken> =>
    this.httpClient.post<any>(
      `${this.URL}${this.CONFIG.token_endpoint}`,
      this.getParams(),
      this.getHttpOptions()
    );

  public setSuccessfulRefreshToken = (response: SuccessfulAccesToken) => {
    console.log(response);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('refresh_token_created_at', `${response.created_at}`);
    localStorage.setItem(
      'refresh_token_expired_time',
      `${response.expires_in}`
    );
    this.store.dispatch(
      fromAuthActions.SetAccesToken({
        successfulResponse: response,
      })
    );
  };

  // private async handleLogout(response: any): Promise<any> {
  //   if (response.status === 200) {
  //     localStorage.removeItem('refresh_token');
  //     localStorage.removeItem('refresh_token_created_at');
  //     localStorage.removeItem('refresh_token_expired_time');
  //     window.location.href = 'https://musing-ramanujan-8002a4.netlify.app';
  //   }
  //   return response;
  // }

  // async logout(): Promise<any> {
  //   fetch(
  //     `${this.URL}oauth/revoke?client_id=${
  //       this.CONFIG.client_id
  //     }&client_secret=${
  //       this.CONFIG.client_secret
  //     }&token=${TOKEN_HANDLER.getToken()}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     }
  //   )
  //     .then((r) =>
  //       this.errorHandling({
  //         response: r,
  //         message: 'something went wrong, try again',
  //       })
  //     )
  //     .then((response) => this.handleLogout(response))
  //     .catch((error) =>
  //       this.errorHandling({
  //         response: error,
  //         message: 'something went wrong, try again',
  //       })
  //     );
  // }
}
