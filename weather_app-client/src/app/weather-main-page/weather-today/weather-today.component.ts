import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

export interface IAdditionalInfo {
  feelsLike: number;
  visibility: number;
  wind: number;
  sunrise?: number;
  sunset?: number;
}

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTodayComponent implements OnChanges {
  constructor() {}

  @Input() weatherData: any;

  date!: Date;
  mainTemp!: number;
  minTemp!: number;
  maxTemp!: number;
  weatherDesc!: string;
  weatherIconSrc!: string;
  additionalInfo!: IAdditionalInfo;

  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes.weatherData.currentValue;

    this.date = new Date(currentValue.dt * 1000);
    this.mainTemp = currentValue.main.temp.toFixed(1);
    this.minTemp = currentValue.main.temp_min.toFixed(1);
    this.maxTemp = currentValue.main.temp_max.toFixed(1);
    this.weatherDesc = currentValue.weather[0].description;
    this.weatherIconSrc = `https://openweathermap.org/img/wn/${currentValue.weather[0].icon}@2x.png`;

    this.additionalInfo = {
      feelsLike: currentValue.main.feels_like,
      visibility: currentValue.visibility,
      wind: currentValue.wind.speed,
      sunrise: currentValue.sys.sunrise,
      sunset: currentValue.sys.sunset,
    };
  }
}
