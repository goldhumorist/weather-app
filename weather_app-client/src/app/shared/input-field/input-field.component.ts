import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  constructor() {}

  @Input() inputProperties!: any;
  @Input() control: any = new FormControl();

  @ViewChild('inputRef') inputRef!: ElementRef;
}
