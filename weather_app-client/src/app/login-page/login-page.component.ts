import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLoginData } from '../shared/interfaces';
import { Store } from '@ngrx/store';
import * as UserActions from '../core/store/user/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private router: Router, private store: Store) {}

  login(loginUserData: IUserLoginData) {
    this.store.dispatch(UserActions.loginInit(loginUserData));
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
