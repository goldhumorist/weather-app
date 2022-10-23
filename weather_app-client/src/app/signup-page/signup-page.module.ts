import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupPageRoutingModule.components],
  imports: [SignupPageRoutingModule, ReactiveFormsModule, SharedModule],
})
export class SignupPageModule {}
