import { getIsAuthenticated } from './../../shared/store/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import * as fromApp from '../../shared/store/app.reducers';
import * as authActions from '../../shared/store/auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss'],
})
export class RedirectPageComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.handleRedirect();
    // this._store.select(getIsAuthenticated).pipe(
    //   tap((data) => {
    //     if (data) {
    //       this._router.navigate(['/calendar']);
    //     }
    //   })
    // );
  }

  handleRedirect = () => {
    console.log(`odpala`);
    this.store.dispatch(authActions.HandleRedirect());
  };
}
