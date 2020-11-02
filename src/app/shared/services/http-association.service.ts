import { Association } from './../models/training-plan.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class HttpAssociationService {
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

  public addTileToDay = (association: Association): Observable<Association> =>
    this.getToken().pipe(
      switchMap((token) => {
        console.log(association);
        return this.httpClient.post<Association>(
          `${this.URL}training_plans/${association.training_plan_id}/calendar_assocs`,
          association,
          this.getHttpOptions(token)
        );
      })
    );

  public removeTileFromDay = (
    association: Association
  ): Observable<Association> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.delete<Association>(
          `${this.URL}training_plans/${association.training_plan_id}/calendar_assocs/${association.id}`,
          this.getHttpOptions(token)
        );
      })
    );
}
