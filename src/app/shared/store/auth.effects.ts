import { RefreshAuthService } from './../auth/refresh-auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, tap, mergeMap, switchMap, exhaustMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
// import * as fromApp from './app.reducers';
import * as authActions from './auth.actions';
import { HttpAuthService } from '../auth/http-auth.service';
import { SuccessfulAccesToken } from '../models/auth.interface';
import { RedirectAuthService } from '../auth/redirect-auth.service';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthEfects {
  HandleRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.HandleRedirect),
      mergeMap(() => {
        return this.redirectAuthService.handleRedirect().pipe(
          map((redirectQuery) => {
            if (redirectQuery.code) {
              console.log(`ten krok`, redirectQuery);
              return authActions.HandleSuccess({ redirectQuery });
            } else if (
              Object.keys(redirectQuery).length === 0 ||
              redirectQuery.error
            ) {
              const errorMessage = redirectQuery.error;
              return authActions.HandleError({ errorMessage });
            }
          })
        );
      })
    )
  );

  HandleSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.HandleSuccess),
      mergeMap(({ redirectQuery }) =>
        this.redirectAuthService.handleSuccess(redirectQuery).pipe(
          map((accesTokenParams) => {
            if (accesTokenParams) {
              return authActions.GetAccesToken({ accesTokenParams });
            } else {
              localStorage.removeItem('pkce_state');
              localStorage.removeItem('pkce_code_verifier');
              const errorMessage = 'Invalid state';
              return authActions.HandleError({ errorMessage });
            }
          })
        )
      )
    )
  );

  getAccesToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.GetAccesToken),
      // tap(() => this._store.dispatch(new authActions.SetInAuthProcess())),
      mergeMap(({ accesTokenParams }) =>
        this.httpAuthService.getAccesToken(accesTokenParams).pipe(
          map((response: SuccessfulAccesToken) => {
            console.log(response);
            localStorage.removeItem('pkce_state');
            localStorage.removeItem('pkce_code_verifier');
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.setItem(
              'refresh_token_created_at',
              `${response.created_at}`
            );
            localStorage.setItem(
              'refresh_token_expired_time',
              `${response.expires_in}`
            );
            return authActions.SetAccesToken({ successfulResponse: response });
          }),
          tap(() => {
            window.history.replaceState({}, null, '/');
            this.router.navigate(['/calendar']);
          })
        )
      )
    )
  );

  makeRefreshToken$: Observable<boolean> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.MakeRefreshToken),
        mergeMap(() => {
          if (this.refreshAuthService.checkRefreshToken()) {
            return this.refreshAuthService.makeRefreshTokenRequest().pipe(
              // tap((response) => {
              //   if (response) {
              //     console.log(response);
              //     localStorage.setItem('refresh_token', response.refresh_token);
              //     localStorage.setItem(
              //       'refresh_token_created_at',
              //       `${response.created_at}`
              //     );
              //     localStorage.setItem(
              //       'refresh_token_expired_time',
              //       `${response.expires_in}`
              //     );
              //     return authActions.SetAccesToken({
              //       successfulResponse: response,
              //     });
              //   }
              // }),
              map((response) => {
                if (response) {
                  this.refreshAuthService.setSuccessfulRefreshToken(response);
                  return true;
                } else {
                  return false;
                }
              })
            );
          } else if (!this.refreshAuthService.checkRefreshToken()) {
            return of(false);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private httpAuthService: HttpAuthService,
    private redirectAuthService: RedirectAuthService,
    private store: Store,
    private router: Router,
    private refreshAuthService: RefreshAuthService
  ) {}
}
