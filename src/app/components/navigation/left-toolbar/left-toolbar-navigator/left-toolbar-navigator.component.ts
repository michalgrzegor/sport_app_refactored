import { ToggleLeftMenu } from './../../../../store/actions/menu.actions';
import { take, tap } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakePointService } from 'src/app/shared/services/breakpoint.service';
import { SetRightMenuComponent } from 'src/app/store/actions/menu.actions';
import { isLeftMenuOpen } from 'src/app/store/selectors/menu.selectors';

@Component({
  selector: 'app-left-toolbar-navigator',
  templateUrl: './left-toolbar-navigator.component.html',
  styleUrls: ['./left-toolbar-navigator.component.scss'],
})
export class LeftToolbarNavigatorComponent implements OnInit, OnDestroy {
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
  public isLeftOpen$: Observable<boolean>;
  private isWeb: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private breakePointService: BreakePointService
  ) {}

  ngOnInit(): void {
    this.HTMLNavigatorElementsArray = this.generateHTMLElementArray();
    this.isLeftOpen$ = this.store.select(isLeftMenuOpen);
    this.subscription.add(
      this.breakePointService.isWeb.subscribe((isWeb) => (this.isWeb = isWeb))
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

  private getIndexOfNavigatorButton = (pathArray: HTMLElement[]): number => {
    return this.HTMLNavigatorElementsArray.map((nodeElement) =>
      pathArray.includes(nodeElement)
    ).indexOf(true);
  };

  private toggleLeftMenu = () => {
    if (!this.isWeb) {
      this.store.dispatch(ToggleLeftMenu());
    }
  };

  private navigateToAddress = (routerAddress: string) => {
    this.router.navigate([`/${routerAddress}`]);
  };

  private changeComponent = (componentName: string) =>
    this.store.dispatch(
      SetRightMenuComponent({ rightComponent: componentName })
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
    this.toggleLeftMenu();
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
