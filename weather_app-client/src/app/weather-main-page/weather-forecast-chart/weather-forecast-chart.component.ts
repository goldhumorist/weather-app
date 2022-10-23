import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-forecast-chart',
  templateUrl: './weather-forecast-chart.component.html',
  styleUrls: ['./weather-forecast-chart.component.scss'],
})
export class WeatherForecastChartComponent {
  constructor() {}

  @Input() weatherDataForChart: any;
}
