import { LogOut } from './../../../store/actions/auth.actions';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuService } from 'src/app/shared/components/menu/menu.service';
import * as MenuActions from '../../../store/actions/menu.actions';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.scss'],
})
export class NavToolbarComponent implements OnInit {
  @ViewChild('button_menu', { read: ViewContainerRef })
  buttonMenu: ViewContainerRef;

  constructor(private store: Store, private menuService: MenuService) {}

  ngOnInit(): void {}

  toggleLeftMenu(): void {
    this.store.dispatch(MenuActions.ToggleLeftMenu());
  }

  private logOut = () => this.store.dispatch(LogOut());

  public openMenu = (event: MouseEvent) => {
    this.menuService.instantinateMenu(
      event.clientX,
      event.clientY,
      {
        menuElementList: [
          {
            name: 'logout',
            callback: this.logOut,
          },
        ],
      },
      this.buttonMenu
    );
  };
}
