import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubHeaderComponent {
  constructor() {}

  @Input() title!: string;
  @Input() subTitle!: string;
}
