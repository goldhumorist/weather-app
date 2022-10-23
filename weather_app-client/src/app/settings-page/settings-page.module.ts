import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageRoutingModule } from './settings-page-routing.module';

@NgModule({
  declarations: [SettingsPageRoutingModule.components],
  imports: [CommonModule, SettingsPageRoutingModule, SharedModule],
})
export class SettingsPageModule {}
