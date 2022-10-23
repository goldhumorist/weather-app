import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FIVE_DAYS,
  ONE_DAY,
} from 'src/app/weather-main-page/weather-main-page.component';

@Component({
  selector: 'app-btn-toggler',
  templateUrl: './btn-toggler.component.html',
  styleUrls: ['./btn-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnTogglerComponent implements OnInit {
  constructor() {}
  ONE_DAY = ONE_DAY;
  FIVE_DAYS = FIVE_DAYS;

  @Input() isActiveButtons: boolean = false;
  @Input() activeButton: string = this.ONE_DAY;
  @Output() changeWeatherModeEmmiter: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {}

  changeWeatherMode() {
    this.changeWeatherModeEmmiter.emit();
  }
}
