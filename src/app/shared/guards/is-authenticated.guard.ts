import { getIsAuthenticated } from './../store/auth.selectors';
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
import { take, map } from 'rxjs/operators';
import * as fromAuthActions from '../store/auth.actions';
import { RefreshAuthService } from '../auth/refresh-auth.service';

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
      map((isAuth) => {
        if (isAuth) {
          return of(true);
        } else {
          return this.store.dispatch(fromAuthActions.MakeRefreshToken());
        }
      }),
      map((isAuth) => {
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
