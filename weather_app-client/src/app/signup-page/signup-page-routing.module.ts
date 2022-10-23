import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignupPageComponent } from './signup-page.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

const routes: Routes = [
  { path: 'signup', component: SignupPageComponent },
  { path: 'verify/:authToken', component: VerifyAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupPageRoutingModule {
  static components = [
    SignupPageComponent,
    SignupFormComponent,
    VerifyAccountComponent,
  ];
}
