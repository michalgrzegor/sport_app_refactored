import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MenuActions from '../../../shared/store/menu.actions';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
})
export class NavToolbarComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  toggleLeftMenu(): void {
    this.store.dispatch(MenuActions.ToggleLeftMenu());
  }
}
