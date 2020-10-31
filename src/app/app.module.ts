import { TileCollectionModule } from './components/tiles-collection/tile-collection.module';
import { PipesModule } from './shared/pipes/pipes.module';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { AppStoreModule } from './store/app-store.module';
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
import { TpMenuComponent } from './components/tp-menu/tp-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TileEditorTrainingComponent } from './components/tile-editor/tile-editor-training/tile-editor-training.component';
import { TileEditorDietComponent } from './components/tile-editor/tile-editor-diet/tile-editor-diet.component';
import { TileEditorQuestionComponent } from './components/tile-editor/tile-editor-question/tile-editor-question.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LeftToolbarHandsetComponent } from './components/navigation/left-toolbar/left-toolbar-handset/left-toolbar-handset.component';
import { LeftToolbarNavigatorComponent } from './components/navigation/left-toolbar/left-toolbar-navigator/left-toolbar-navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    LeftToolbarComponent,
    RightToolbarComponent,
    TileEditorComponent,
    AthleteManagerComponent,
    TpMenuComponent,
    TileEditorTrainingComponent,
    TileEditorDietComponent,
    TileEditorQuestionComponent,
    LeftToolbarHandsetComponent,
    LeftToolbarNavigatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    PipesModule,
    TileCollectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
