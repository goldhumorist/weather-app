import { WeatherForecastCardComponent } from './weather-forecast-card/weather-forecast-card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherMainPageComponent } from './weather-main-page.component';
import { WeatherTodayComponent } from './weather-today/weather-today.component';
import { WeatherSubInfoComponent } from './weather-sub-info/weather-sub-info.component';
import { WeatherForecastChartComponent } from './weather-forecast-chart/weather-forecast-chart.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherMainPageComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherMainPageRoutingModule {
  static components = [
    WeatherMainPageComponent,
    WeatherTodayComponent,
    WeatherForecastComponent,
    WeatherSubInfoComponent,
    WeatherForecastCardComponent,
    WeatherForecastChartComponent,
  ];
}
