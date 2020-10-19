import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { RefreshAuthService } from '../auth/refresh-auth.service';
import { getIsAuthenticated } from 'src/app/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private refreshAuthService: RefreshAuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(getIsAuthenticated).pipe(
      take(1),
      mergeMap((isAuth) => {
        if (isAuth) {
          return of(true);
        } else {
          if (this.refreshAuthService.checkRefreshToken()) {
            return this.refreshAuthService.makeRefreshTokenRequest().pipe(
              mergeMap((response) => {
                if (response) {
                  this.refreshAuthService.setSuccessfulRefreshToken(response);
                  return of(true);
                } else {
                  this.router.navigate(['/login']);
                  return of(false);
                }
              })
            );
          } else {
            return of(false);
          }
        }
      })
    );
  }
}
