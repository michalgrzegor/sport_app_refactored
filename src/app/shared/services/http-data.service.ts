import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  TrainingPlanInfo,
  TrainingPlan,
} from '../models/training-plan.interface';
import { Store } from '@ngrx/store';
import { switchMap, skipWhile } from 'rxjs/operators';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';
import { NewTrainingPlan } from '../models/new-training-plan';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  private URL = 'https://stormy-plains-57531.herokuapp.com/api/v1/';

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
        return this.httpClient.get<TrainingPlanInfo[]>(
          `${this.URL}training_plans`,
          this.getHttpOptions(token)
        );
      })
    );

  getTrainingPlan = (id: string): Observable<TrainingPlan> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.get<TrainingPlan>(
          `${this.URL}training_plans/${id}`,
          this.getHttpOptions(token)
        );
      })
    );

  createTrainingPlan = (
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

  deleteTrainingPlan = (id: number): Observable<any> =>
    this.getToken().pipe(
      switchMap((token) => {
        return this.httpClient.delete(
          `${this.URL}training_plans/${id}`,
          this.getHttpOptions(token)
        );
      })
    );
}

// deleteTrainingPlan(id: number) {
//   this._http
//     .delete(`${this.URL}training_plans/${id}`, this.getHttpOptions())
//     .subscribe((response) => {
//       this._store.dispatch(new TilesDataActions.DeleteTpManager(id));
//     });
// }
