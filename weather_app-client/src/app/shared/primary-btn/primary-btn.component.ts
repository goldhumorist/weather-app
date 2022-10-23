import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['./primary-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryBtnComponent {
  constructor() {}

  @Input() btnConfig!: { type: string; text: string };
  @Input() disabled: boolean = false;
  @Output() btnClickEmitter: EventEmitter<void> = new EventEmitter();

  onclick() {
    this.btnClickEmitter.emit();
  }
}
