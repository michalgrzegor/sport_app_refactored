import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TrainingPlansDataEfects } from './effects/training-plans-data.effects';
import { reducers } from './app.reducers';
import { AuthEfects } from './effects/auth.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TrainingPlansDataEfects, AuthEfects]),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}