import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { isLeftMenuOpen } from 'src/app/store/selectors/menu.selectors';

@Component({
  selector: 'app-left-toolbar',
  templateUrl: './left-toolbar.component.html',
  styleUrls: ['./left-toolbar.component.scss'],
})
export class LeftToolbarComponent implements OnInit {
  public isLeftOpen$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLeftOpen$ = this.store.select(isLeftMenuOpen);
  }
}
