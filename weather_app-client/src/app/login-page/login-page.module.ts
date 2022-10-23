import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginPageRoutingModule } from './login-page-routing.module';

@NgModule({
  declarations: [LoginPageRoutingModule.components],
  imports: [LoginPageRoutingModule, SharedModule, ReactiveFormsModule],
})
export class LoginPageModule {}
