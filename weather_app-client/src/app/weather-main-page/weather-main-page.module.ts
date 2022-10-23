import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherMainPageRoutingModule } from './weather-main-page-routing.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [WeatherMainPageRoutingModule.components],
  imports: [
    CommonModule,
    WeatherMainPageRoutingModule,
    SharedModule,
    NgChartsModule,
  ],
})
export class WeatherMainPageModule {}
