import { Association } from './../models/training-plan.interface';
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

  public getTiles = (): Observable<Tile[]> =>
    this.getToken().pipe(
      switchMap((token) =>
        this.httpClient.get<Tile[]>(
          `${this.URL}tiles`,
          this.getHttpOptions(token)
        )
      )
    );

  public createTile = (tile: Tile): Observable<Tile> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.post<Tile>(
          `${this.URL}${tile.tile_type}_tiles`,
          tile,
          this.getHttpOptions(token)
        );
      })
    );

  public deleteTile = (tile: Tile): Observable<Tile> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.delete<Tile>(
          `${this.URL}${tile.tile_type}_tiles/${tile.id}`,
          this.getHttpOptions(token)
        );
      })
    );

  public updateTile = (tile: Tile): Observable<Tile> =>
    this.getToken().pipe(
      switchMap((token) => {
        console.log(JSON.stringify(tile));
        return this.httpClient.patch<Tile>(
          `${this.URL}${tile.tile_type}_tiles/${tile.id}`,
          tile,
          this.getHttpOptions(token)
        );
      })
    );
}
