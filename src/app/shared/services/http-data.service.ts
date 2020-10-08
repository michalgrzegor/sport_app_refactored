import { getAccessToken } from './../store/auth.selectors';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  TrainingPlanInfo,
  TrainingPlan,
} from '../models/training-plan.interface';
import { Store } from '@ngrx/store';
import { switchMap, skipWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private URL = 'https://stormy-plains-57531.herokuapp.com/api/v1/';
  private TOKEN: string;

  constructor(private httpClient: HttpClient, private store: Store) {}

  getToken = (): Observable<string> =>
    this.store.select(getAccessToken).pipe(skipWhile((data) => data === null));

  getHttpOptions = (token: string): { headers: HttpHeaders } => ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  });

  getTrainingPlansList = (): Observable<TrainingPlanInfo[]> =>
    this.getToken().pipe(
      switchMap((token) => {
        console.log(token);
        return this.httpClient.get<TrainingPlanInfo[]>(
          `${this.URL}training_plans`,
          this.getHttpOptions(token)
        );
      })
    );

  getTrainingPlan = (id: string): Observable<TrainingPlan> =>
    this.getToken().pipe(
      switchMap((token) => {
        console.log(token);
        return this.httpClient.get<TrainingPlan>(
          `${this.URL}training_plans/${id}`,
          this.getHttpOptions(token)
        );
      })
    );
}
