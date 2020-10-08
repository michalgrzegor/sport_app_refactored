import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./components/calendar/calendar.module').then(
        (m) => m.CalendarModule
      ),
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'redirect',
    loadChildren: () =>
      import('./components/redirect-page/redirect-page.module').then(
        (m) => m.RedirectPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
