import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private CONFIG: { [propName: string]: string };
  private URL: string;
  constructor() {
    this.URL = 'https://stormy-plains-57531.herokuapp.com/';

    this.CONFIG = {
      client_id: '47IJONQpYYxJa9SfynWN2Fgh7dJ4mvA-wDqHLF-RLSo',
      redirect_uri: 'http://localhost:4200/redirect',
      authorization_endpoint: 'oauth/authorize',
      token_endpoint: 'oauth/token',
      requested_scopes: 'openid',
      client_secret: 'GMaLKm0YXWuKKQiqNN9qhPv5np2yVlgI_9rCuaky2CI',
    };
  }

  private generateRandomString(): string {
    const array: Uint32Array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => `0${dec.toString(16)}`.substr(-2)).join(
      ''
    );
  }

  private sha256(plain: string): PromiseLike<ArrayBuffer> {
    const encoder: TextEncoder = new TextEncoder();
    const data: Uint8Array = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  private base64urlencode(str: ArrayBuffer): string {
    const numberArray = new Uint8Array(str);
    return btoa(String.fromCharCode.apply(null, numberArray))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  private async pkceChallengeFromVerifier(v: string): Promise<string> {
    const hashed: ArrayBuffer = await this.sha256(v);
    return this.base64urlencode(hashed);
  }

  async login(): Promise<void> {
    const state: string = this.generateRandomString();
    localStorage.setItem('pkce_state', state);
    const codeVerifier: string = this.generateRandomString();
    localStorage.setItem('pkce_code_verifier', codeVerifier);
    const codeChallenge: string = await this.pkceChallengeFromVerifier(
      codeVerifier
    );
    const url = `${this.URL}${
      this.CONFIG.authorization_endpoint
    }?response_type=code&client_id=${encodeURIComponent(
      this.CONFIG.client_id
    )}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(
      this.CONFIG.redirect_uri
    )}&code_challenge=${encodeURIComponent(
      codeChallenge
    )}&code_challenge_method=S256`;
    window.location.href = url;
  }
}
