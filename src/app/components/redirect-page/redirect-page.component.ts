import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../store/actions/auth.actions';
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
  }

  handleRedirect = () => {
    this.store.dispatch(authActions.HandleRedirect());
  };
}
