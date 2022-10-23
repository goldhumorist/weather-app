import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';


@Component({
  selector: 'app-btn-link',
  templateUrl: './btn-link.component.html',
  styleUrls: ['./btn-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnLinkComponent {
  constructor() {}
  

  @Input() text!: string;
  @Input() positionIsLeft!: boolean;
  @Output() btnLinkOnClick = new EventEmitter();

  onclick() {
    this.btnLinkOnClick.emit();
  }
}
