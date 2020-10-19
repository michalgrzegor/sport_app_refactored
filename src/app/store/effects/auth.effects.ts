import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, mergeMap } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';
import { Router } from '@angular/router';
import { HttpAuthService } from 'src/app/shared/auth/http-auth.service';
import { RedirectAuthService } from 'src/app/shared/auth/redirect-auth.service';
import { SuccessfulAccesToken } from 'src/app/shared/models/auth.interface';

@Injectable()
export class AuthEfects {
  HandleRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.HandleRedirect),
      mergeMap(() => {
        return this.redirectAuthService.handleRedirect().pipe(
          map((redirectQuery) => {
            if (redirectQuery.code) {
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
      mergeMap(({ accesTokenParams }) =>
        this.httpAuthService.getAccesToken(accesTokenParams).pipe(
          map((response: SuccessfulAccesToken) => {
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

  constructor(
    private actions$: Actions,
    private httpAuthService: HttpAuthService,
    private redirectAuthService: RedirectAuthService,
    private router: Router
  ) {}
}
