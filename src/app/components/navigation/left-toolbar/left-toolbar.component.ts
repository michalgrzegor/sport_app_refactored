import { Subscription, Observable } from 'rxjs';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MenuActions from '../../../store/actions/menu.actions';
import { isLeftMenuOpen } from 'src/app/store/selectors/menu.selectors';

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

  private HTMLNavigatorElementsArray: HTMLElement[];
  isLeftOpen: Observable<boolean>;
  // public isLeftOpen = true;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.HTMLNavigatorElementsArray = this.generateHTMLElementArray();
    this.isLeftOpen = this.store.select(isLeftMenuOpen);
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

  private getIndexOfNavigatorButton = (pathArray: HTMLElement[]): number => {
    return this.HTMLNavigatorElementsArray.map((nodeElement) =>
      pathArray.includes(nodeElement)
    ).indexOf(true);
  };

  private navigateToAddress = (routerAddress: string) => {
    this.router.navigate([`/${routerAddress}`]);
  };

  private changeComponent = (componentName: string) =>
    this.store.dispatch(
      MenuActions.SetRightMenuComponent({ rightComponent: componentName })
    );

  private makeNavigation = (index: number) => {
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
