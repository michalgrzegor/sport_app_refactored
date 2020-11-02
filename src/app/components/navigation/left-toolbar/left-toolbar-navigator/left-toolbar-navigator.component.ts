import { TilesCollectionComponent } from './../../../tiles-collection/tiles-collection.component';
import { ToggleLeftMenu } from './../../../../store/actions/menu.actions';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakePointService } from 'src/app/shared/services/breakpoint.service';
import { SetRightMenuComponent } from 'src/app/store/actions/menu.actions';
import { isLeftMenuOpen } from 'src/app/store/selectors/menu.selectors';
import { ModalMediatorService } from 'src/app/shared/components/modal/modal-mediator.service';

@Component({
  selector: 'app-left-toolbar-navigator',
  templateUrl: './left-toolbar-navigator.component.html',
  styleUrls: ['./left-toolbar-navigator.component.scss'],
})
export class LeftToolbarNavigatorComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @ViewChildren('btn', { read: ViewContainerRef }) btnNodesArray: QueryList<
    ViewContainerRef
  >;

  private HTMLNavigatorElementsArray: HTMLElement[];
  public isLeftOpen$: Observable<boolean>;
  private isWeb: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private modalMediatorService: ModalMediatorService,
    private breakePointService: BreakePointService
  ) {}

  ngOnInit(): void {
    this.isLeftOpen$ = this.store.select(isLeftMenuOpen);
    this.subscription.add(
      this.breakePointService.isWeb.subscribe((isWeb) => (this.isWeb = isWeb))
    );
  }

  ngAfterViewInit(): void {
    this.HTMLNavigatorElementsArray = this.btnNodesArray
      .toArray()
      .map((n) => n.element.nativeElement);
  }

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

  private openModal = (componentName: string) => {
    switch (componentName) {
      case 'tileeditor':
        this.modalMediatorService.OpenTileEditorComponent({
          title: 'Tile Editor',
          style: [{ height: '80vh' }, { width: '90vw' }],
        });
        break;
      case 'tilecollection':
        this.modalMediatorService.OpenTilesCollectionComponent({
          title: 'Tiles Collection',
          style: [{ height: '80vh' }, { width: '90vw' }],
        });
        break;
      case 'tp':
        this.modalMediatorService.OpenTrainingPlanMenuComponent({
          title: 'Programs board',
          style: [{ height: '80vh' }, { width: '90vw' }],
        });
        break;
    }
  };

  private changeComponent = (
    componentName: string,
    isRouterAdress: boolean
  ) => {
    if (this.isWeb) {
      this.store.dispatch(
        SetRightMenuComponent({ rightComponent: componentName })
      );
    } else if (isRouterAdress) {
      this.openModal(componentName);
    }
  };

  private makeNavigation = (index: number) => {
    const button = this.HTMLNavigatorElementsArray[index];
    const rightPanelComponent = button.getAttribute('rightpanel');
    const routerAddress = button.getAttribute('routeraddress');
    const addressesUnderDevelopment = ['athletecard', 'board', 'loops'];
    if (routerAddress && !addressesUnderDevelopment.includes(routerAddress)) {
      this.navigateToAddress(routerAddress);
    }
    if (rightPanelComponent) {
      this.changeComponent(rightPanelComponent, !routerAddress);
    }
    this.toggleLeftMenu();
  };

  public navigate = (e) => {
    const index = this.getIndexOfNavigatorButton(e.path);
    if (index >= 0) {
      this.makeNavigation(index);
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
