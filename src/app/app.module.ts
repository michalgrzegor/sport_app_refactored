import { AppStoreModule } from './shared/store/app-store.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavToolbarComponent } from './components/navigation/nav-toolbar/nav-toolbar.component';
import { LeftToolbarComponent } from './components/navigation/left-toolbar/left-toolbar.component';
import { RightToolbarComponent } from './components/navigation/right-toolbar/right-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TileEditorComponent } from './components/tile-editor/tile-editor.component';
import { AthleteManagerComponent } from './components/athlete-manager/athlete-manager.component';
import { TilesCollectionComponent } from './components/tiles-collection/tiles-collection.component';
import { TpMenuComponent } from './components/tp-menu/tp-menu.component';
import { TableComponent } from './shared/components/table/table.component';
import { TableRowComponent } from './shared/components/table/table-row/table-row.component';

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    LeftToolbarComponent,
    RightToolbarComponent,
    TileEditorComponent,
    AthleteManagerComponent,
    TilesCollectionComponent,
    TpMenuComponent,
    TableComponent,
    TableRowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AppStoreModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
