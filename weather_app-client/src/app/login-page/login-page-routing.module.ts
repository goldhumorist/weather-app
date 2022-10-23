import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [{ path: 'login', component: LoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {
  static components = [LoginPageComponent, LoginFormComponent];
}
