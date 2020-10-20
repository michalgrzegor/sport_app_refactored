import {
  AfterViewInit,
  Component,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { MenuOptions } from '../../models/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit {
  @ViewChildren('menu') menu: QueryList<any>;
  public id: string;
  public xPosition: number;
  public yPosition: number;
  public menuOptions: MenuOptions;
  public closeMenu: (id: string) => void;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.menu.first.nativeElement,
      'top',
      `${this.yPosition}px`
    );
    this.renderer.setStyle(
      this.menu.first.nativeElement,
      'left',
      `${this.xPosition - this.menu.first.nativeElement.offsetWidth}px`
    );
  }

  public close = () => this.closeMenu(this.id);
}
