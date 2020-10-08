import { Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MenuActions from '../../../shared/store/menu.actions';
import { isLeftMenuOpen } from 'src/app/shared/store/menu.selectors';

@Component({
  selector: 'app-left-toolbar',
  templateUrl: './left-toolbar.component.html',
  styleUrls: ['./left-toolbar.component.scss'],
})
export class LeftToolbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  // Buttons to navigate
  @ViewChild('athleteCards', { static: true }) athleteCards: ElementRef;
  @ViewChild('programs', { static: true }) programs: ElementRef;
  @ViewChild('board', { static: true }) board: ElementRef;
  @ViewChild('loop', { static: true }) loop: ElementRef;

  // Buttons to change right panel
  @ViewChild('tilecollection', { static: true }) tilecollection: ElementRef;
  @ViewChild('tileeditor', { static: true }) tileeditor: ElementRef;

  HTMLNavigatorElementsArray: HTMLElement[];

  isLeftOpen = true;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.HTMLNavigatorElementsArray = this.generateHTMLElementArray();

    this.subscription.add(
      this.store
        .select(isLeftMenuOpen)
        .subscribe((data) => (this.isLeftOpen = data))
    );
  }

  private generateHTMLElementArray = (): HTMLElement[] =>
    [
      this.athleteCards,
      this.programs,
      this.board,
      this.loop,
      this.tilecollection,
      this.tileeditor,
    ].map((element) => element.nativeElement);

  getIndexOfNavigatorButton = (pathArray: HTMLElement[]): number => {
    return this.HTMLNavigatorElementsArray.map((nodeElement) =>
      pathArray.includes(nodeElement)
    ).indexOf(true);
  };

  navigateToAddress = (routerAddress: string) => {
    this.router.navigate([`/${routerAddress}`]);
  };

  changeComponent = (componentName: string) =>
    this.store.dispatch(
      MenuActions.SetRightMenuComponent({ rightComponent: componentName })
    );

  makeNavigation = (index: number) => {
    const button = this.HTMLNavigatorElementsArray[index];
    const rightPanelComponent = button.getAttribute('rightpanel');
    const routerAddress = button.getAttribute('routeraddress');
    if (routerAddress) {
      this.navigateToAddress(routerAddress);
    }
    if (rightPanelComponent) {
      this.changeComponent(rightPanelComponent);
    }
  };

  navigate = (e) => {
    const index = this.getIndexOfNavigatorButton(e.path);
    if (index >= 0) {
      this.makeNavigation(index);
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
