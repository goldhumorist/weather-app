import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-weather-forecast-card',
  templateUrl: './weather-forecast-card.component.html',
  styleUrls: ['./weather-forecast-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecastCardComponent implements OnChanges {
  constructor() {}

  @Input() weatherDataPerDay: any;

  currentDate!: Date;
  tempInCurrentday!: string;
  iconSrc!: string;

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue = changes.weatherDataPerDay.currentValue;

    this.tempInCurrentday = currentValue.main.temp.toFixed(1);

    this.currentDate = new Date(currentValue.dt * 1000);

    this.iconSrc = `https://openweathermap.org/img/wn/${currentValue.weather[0].icon}@2x.png`;
  }
}
