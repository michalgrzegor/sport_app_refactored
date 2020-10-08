import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { rightMenuComponent } from 'src/app/shared/store/menu.selectors';

@Component({
  selector: 'app-right-toolbar',
  templateUrl: './right-toolbar.component.html',
  styleUrls: ['./right-toolbar.component.scss'],
})
export class RightToolbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  componentName: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(rightMenuComponent)
        .subscribe((data) => (this.componentName = data))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
