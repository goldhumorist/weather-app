import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomLoaderComponent {}
