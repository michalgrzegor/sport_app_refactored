import { PipesModule } from './../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TableRowComponent } from './table/table-row/table-row.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    TableComponent,
    TableRowComponent,
    ModalComponent,
    MenuComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, PipesModule],
  exports: [
    TableComponent,
    TableRowComponent,
    ModalComponent,
    MenuComponent,
    SpinnerComponent,
  ],
})
export class SharedComponentsModule {}
