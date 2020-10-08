import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccesTokenParams, RedirectQuery } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class RedirectAuthService {
  private CONFIG: { [propName: string]: string };
  constructor() {
    this.CONFIG = {
      client_id: '47IJONQpYYxJa9SfynWN2Fgh7dJ4mvA-wDqHLF-RLSo',
      redirect_uri: 'http://localhost:4200/redirect',
      authorization_endpoint: 'oauth/authorize',
      token_endpoint: 'oauth/token',
      requested_scopes: 'openid',
      client_secret: 'GMaLKm0YXWuKKQiqNN9qhPv5np2yVlgI_9rCuaky2CI',
    };
  }

  private parseQueryString = (str: string): RedirectQuery => {
    if (str === '') {
      return {};
    }
    const segments = str.split('&').map((s) => s.split('='));
    let queryString = {};
    segments.forEach((s) => {
      queryString = {
        ...queryString,
        ...{
          [s[0]]: s[1],
        },
      };
    });
    return queryString;
  };

  private accessTokenParams = (query: RedirectQuery): AccesTokenParams => ({
    grant_type: 'authorization_code',
    code: query.code,
    client_id: this.CONFIG.client_id,
    redirect_uri: this.CONFIG.redirect_uri,
    code_verifier: localStorage.getItem('pkce_code_verifier'),
    client_secret: this.CONFIG.client_secret,
  });

  handleSuccess = (query: RedirectQuery): Observable<AccesTokenParams> => {
    if (localStorage.getItem('pkce_state') !== query.state) {
      return of(null);
    } else {
      return of(this.accessTokenParams(query));
    }
  };

  handleRedirect = (): Observable<RedirectQuery> =>
    of(this.parseQueryString(window.location.search.substring(1)));
}
