import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IAdditionalInfo } from '../weather-today/weather-today.component';

export interface ITodayData {
  temp: number;
  date: Date;
  iconSrc: string;
  additionalInfo: IAdditionalInfo;
}
export const MS_IN_DAY = 86400;

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent {
  constructor() {}

  @Input() weatherData: any;
  todayData!: ITodayData;
  weatherDataByDay: any;
  weatherDataForChart: any;
  options = {
    responsive: true,

    maintainAspectRatio: false,
    tension: 0.5,
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          maxTicksLimit: 5,
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  ngOnChanges(changes: SimpleChanges) {
    const currentValue = changes.weatherData.currentValue;

    this.todayData = {
      temp: currentValue.list[0].main.temp.toFixed(1),
      date: new Date(currentValue.list[0].dt * 1000),
      iconSrc: `https://openweathermap.org/img/wn/${currentValue.list[0].weather[0].icon}@2x.png`,
      additionalInfo: {
        feelsLike: currentValue.list[0].main.feels_like,
        visibility: currentValue.list[0].visibility,
        wind: currentValue.list[0].wind.speed,
      },
    };

    this.weatherDataByDay = this.getWeatherDataByDay(currentValue);

    const labels = currentValue.list.map((item: any) =>
      item.dt_txt.slice(5, 10)
    );
    const data = currentValue.list.map((item: any) => item.main.temp);

    this.weatherDataForChart = {
      labels: labels,
      datasets: [
        {
          data: data,
          borderColor: 'rgba(255, 153, 0, 1)',
          backgroundColor: 'white',
          borderWidth: 2,
          pointRadius: 1.5,
        },
      ],
      options: this.options,
    };
  }

  getWeatherDataByDay(weatherData: { list: Array<any> }) {
    let tempDate: number;

    return weatherData.list.filter((item, index) => {
      if (index === 0) {
        tempDate = item.dt;
      }
      if (item.dt - tempDate === MS_IN_DAY) {
        tempDate = item.dt;
        return item;
      }
      return null;
    });
  }
}
