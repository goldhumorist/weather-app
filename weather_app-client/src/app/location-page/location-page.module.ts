import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPageRoutingModule } from './location-page-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LocationPageRoutingModule.components],
  imports: [CommonModule, LocationPageRoutingModule, SharedModule],
})
export class LocationPageModule {}
