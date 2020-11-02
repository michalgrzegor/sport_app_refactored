import { PipesModule } from './../../shared/pipes/pipes.module';
import { TileComponent } from './tile/tile.component';
import { TilesCollectionComponent } from './tiles-collection.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TilesCollectionHandsetComponent } from './tiles-collection-handset/tiles-collection-handset.component';

@NgModule({
  declarations: [TilesCollectionComponent, TileComponent, TilesCollectionHandsetComponent],
  imports: [CommonModule, SharedComponentsModule, DragDropModule, PipesModule],
  exports: [TilesCollectionComponent, TileComponent],
})
export class TileCollectionModule {}
