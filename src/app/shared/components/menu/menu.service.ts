import { MenuComponent } from './menu.component';
import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { MenuOptions, MenuRefernce } from '../../models/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuReferences: MenuRefernce[] = [];
  private id = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  private closeMenu = (id: string) => {
    const menu = this.menuReferences.find((ref) => ref.id === id).componentRef;
    menu.destroy();
  };

  private createMenuRef = (
    componentToInject: ViewContainerRef,
    id: string,
    xPosition: number,
    yPosition: number,
    menuOptions: MenuOptions
  ) => {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      MenuComponent
    );
    const componentRef = componentToInject.createComponent(factory);
    componentRef.instance.id = id;
    componentRef.instance.xPosition = xPosition;
    componentRef.instance.yPosition = yPosition;
    componentRef.instance.menuOptions = menuOptions;
    componentRef.instance.closeMenu = this.closeMenu;
    componentRef.changeDetectorRef.detectChanges();
    this.menuReferences.push({ id, componentRef });
  };

  public instantinateMenu = (
    xPosition: number,
    yPosition: number,
    menuOptions: MenuOptions,
    componentToInject: ViewContainerRef
  ): void => {
    const id = `menu-${this.id}`;
    this.createMenuRef(
      componentToInject,
      id,
      xPosition,
      yPosition,
      menuOptions
    );
    this.id++;
  };
}
