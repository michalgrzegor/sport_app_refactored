import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { getTime } from 'date-fns';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuccessfulAccesToken } from '../models/auth.interface';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../../store/actions/auth.actions';
import { CONFIG } from './config';

@Injectable({
  providedIn: 'root',
})
export class RefreshAuthService {
  private CONFIG: { [propName: string]: string };
  private URL = 'https://stormy-plains-57531.herokuapp.com/';

  constructor(private httpClient: HttpClient, private store: Store) {
    this.CONFIG = CONFIG;
  }

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
}
