import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { LocationPageComponent } from './location-page.component';

const routes: Routes = [
  {
    path: 'location',
    component: LocationPageComponent,
    // canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPageRoutingModule {
  static components = [LocationPageComponent];
}
