import { Observable } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakePointService {
  isHandset: Observable<boolean>;
  isTablet: Observable<boolean>;
  isWeb: Observable<boolean>;

  constructor(public breakpointObserver: BreakpointObserver) {
    this.isHandset = new Observable<boolean>((observer) => {
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
    });
    this.isTablet = new Observable<boolean>((observer) => {
      this.breakpointObserver
        .observe([Breakpoints.Tablet])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
    });
    this.isWeb = new Observable<boolean>((observer) => {
      this.breakpointObserver
        .observe([Breakpoints.Web])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
    });
  }
}
