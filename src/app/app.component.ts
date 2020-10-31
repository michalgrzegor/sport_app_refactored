import { BreakePointService } from './shared/services/breakpoint.service';
import { Subscription, Observable } from 'rxjs';
import { getIsAuthenticated } from './store/selectors/auth.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isAuthenticated: boolean;
  private subscription: Subscription = new Subscription();
  public isWeb$: Observable<boolean>;

  constructor(
    private store: Store,
    private breakePointService: BreakePointService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(getIsAuthenticated).subscribe((data) => {
        this.isAuthenticated = data;
      })
    );
    this.isWeb$ = this.breakePointService.isWeb;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
