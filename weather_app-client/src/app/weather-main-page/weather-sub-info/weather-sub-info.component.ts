import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { IAdditionalInfo } from '../weather-today/weather-today.component';

@Component({
  selector: 'app-weather-sub-info',
  templateUrl: './weather-sub-info.component.html',
  styleUrls: ['./weather-sub-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSubInfoComponent  {
  constructor() {}

  @Input() isOnSenter: boolean = true;
  @Input() additionalInfo!: IAdditionalInfo;

  feelsLike!: string;
  visibility!: number;
  wind!: string;
  sunrise?: Date;
  sunset?: Date;


  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes.additionalInfo.currentValue;

    this.feelsLike = currentValue.feelsLike.toFixed(1);
    this.visibility = currentValue.visibility;
    this.wind = currentValue.wind.toFixed(1);

    if (currentValue.sunrise && currentValue?.sunset) {
      this.sunrise = new Date(currentValue.sunrise * 1000);
      this.sunset = new Date(currentValue?.sunset * 1000);
    }
  }
}
