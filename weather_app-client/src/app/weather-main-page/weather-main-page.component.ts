import { takeUntil, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../core/services/websocket.service';

export const ONE_DAY = 'one';
export const FIVE_DAYS = 'five';

@Component({
  selector: 'app-weather-main-page',
  templateUrl: './weather-main-page.component.html',
  styleUrls: ['./weather-main-page.component.scss'],
})
export class WeatherMainPageComponent implements OnInit, OnDestroy {
  ONE_DAY = ONE_DAY;
  FIVE_DAYS = FIVE_DAYS;

  websocketStream$;
  private destroySubject$ = new Subject<void>();

  weatherData: any = null;
  forecastTime: string = ONE_DAY;

  constructor(websocketService: WebsocketService) {
    this.websocketStream$ = websocketService.websocketSubject$;
  }

  ngOnInit() {
    this.websocketStream$.pipe(takeUntil(this.destroySubject$)).subscribe({
      next: (data) => {
        console.log('ANGULAR', data);
        this.weatherData = data;
      },
      error: (err) => {
        console.log('close connection by error', err);
      },
      complete: () => console.log('connection is over'),
    });
    setTimeout(() => {
      this.websocketStream$.next({ type: this.forecastTime });
    }, 1000);
  }

  ngOnDestroy() {
    this.websocketStream$.complete();
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  changeForecastTime() {
    this.weatherData = null;
    this.forecastTime = this.forecastTime === ONE_DAY ? FIVE_DAYS : ONE_DAY;
    this.websocketStream$.next({ type: this.forecastTime });
  }
}
