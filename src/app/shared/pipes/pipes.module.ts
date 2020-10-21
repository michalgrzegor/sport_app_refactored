import { ShortenTextPipe } from './shorten-text.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ShortenTextPipe],
  providers: [ShortenTextPipe],
  exports: [ShortenTextPipe],
})
export class PipesModule {}
