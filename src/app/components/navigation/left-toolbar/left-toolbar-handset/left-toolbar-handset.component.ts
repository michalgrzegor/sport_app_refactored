import { ToggleLeftMenu } from './../../../../store/actions/menu.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLeftMenuOpen } from 'src/app/store/selectors/menu.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-left-toolbar-handset',
  templateUrl: './left-toolbar-handset.component.html',
  styleUrls: ['./left-toolbar-handset.component.scss'],
})
export class LeftToolbarHandsetComponent implements OnInit {
  public isLeftOpen$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLeftOpen$ = this.store
      .select(isLeftMenuOpen)
      .pipe(map((isOpen) => !isOpen));
  }

  public toggleLeftMenu = () => this.store.dispatch(ToggleLeftMenu());
}
