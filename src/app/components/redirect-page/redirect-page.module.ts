import { RedirectPageComponent } from './redirect-page.component';
import { NgModule } from '@angular/core';
import { RedirectPageRoutingModule } from './redirect-page-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

@NgModule({
  declarations: [RedirectPageComponent],
  imports: [RedirectPageRoutingModule, SharedComponentsModule],
})
export class RedirectPageModule {}
