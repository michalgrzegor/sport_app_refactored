import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { rightMenuComponent } from 'src/app/store/selectors/menu.selectors';

@Component({
  selector: 'app-right-toolbar',
  templateUrl: './right-toolbar.component.html',
  styleUrls: ['./right-toolbar.component.scss'],
})
export class RightToolbarComponent implements OnInit {
  public componentName: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.componentName = this.store.select(rightMenuComponent);
  }
}
