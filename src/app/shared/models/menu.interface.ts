import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuComponent } from '../components/menu/menu.component';
import { StyleOption } from './modal-options';

export interface MenuOptions {
  style?: StyleOption[];
  menuElementList: MenuElement[];
}

export interface MenuRefernce {
  id: string;
  componentRef: ComponentRef<MenuComponent>;
}

export interface MenuElement {
  name: string;
  callback: () => void;
}
