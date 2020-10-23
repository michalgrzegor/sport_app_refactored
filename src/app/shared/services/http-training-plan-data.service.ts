import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  TrainingPlanInfo,
  TrainingPlan,
} from '../models/training-plan.interface';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';
import { NewTrainingPlan } from '../models/new-training-plan';

@Injectable({
  providedIn: 'root',
})
export class HttpTrainingPlanDataService {
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

  public getTrainingPlansList = (): Observable<TrainingPlanInfo[]> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.get<TrainingPlanInfo[]>(
          `${this.URL}training_plans`,
          this.getHttpOptions(token)
        );
      })
    );

  public getTrainingPlan = (id: string): Observable<TrainingPlan> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.get<TrainingPlan>(
          `${this.URL}training_plans/${id}`,
          this.getHttpOptions(token)
        );
      })
    );

  public createTrainingPlan = (
    newTrainingPlan: NewTrainingPlan
  ): Observable<TrainingPlan> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.post<TrainingPlan>(
          `${this.URL}training_plans`,
          newTrainingPlan,
          this.getHttpOptions(token)
        );
      })
    );

  public deleteTrainingPlan = (id: number): Observable<any> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.delete(
          `${this.URL}training_plans/${id}`,
          this.getHttpOptions(token)
        );
      })
    );
}
