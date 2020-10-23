import { Tile } from './../models/tile.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class HttpTileDataService {
  private URL = 'https://stormy-plains-57531.herokuapp.com/api/v1/';

  constructor(private httpClient: HttpClient, private store: Store) {}

  private getToken = (): Observable<string> =>
    this.store.select(getAccessToken).pipe(take(1));

  private getHttpOptions = (token: string): { headers: HttpHeaders } => ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  });

  public createTile = (
    tile: Tile,
    type: 'diet' | 'question' | 'training'
  ): Observable<Tile> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.post<Tile>(
          `${this.URL}${type}_tiles`,
          tile,
          this.getHttpOptions(token)
        );
      })
    );
}
