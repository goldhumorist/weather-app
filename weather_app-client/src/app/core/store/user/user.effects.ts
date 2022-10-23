import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, tap, exhaustMap, EMPTY, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as UserActions from './user.actions';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private store: Store
  ) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginInit),
      exhaustMap((userLoginData) => {
        return this.authService.login(userLoginData).pipe(
          map((user) => UserActions.loginSuccess(user)),
          tap((loginRequeserResult) => {
            const { token, city } = loginRequeserResult;

            this.localStorageService.setAuthTokenToLocalStorage(token!);

            city
              ? this.router.navigate(['/'])
              : this.router.navigate(['/location']);
          }),
          catchError((err) => {
            this.store.dispatch(
              UserActions.loginFailure({
                error: err?.error?.message || 'Something went wrong',
              })
            );

            return EMPTY;
          })
        );
      })
    )
  );

  changeUserSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.changeUsersSettingsInit),
      exhaustMap((newUserSettings) => {
        return this.userService.changeUsersSettings(newUserSettings).pipe(
          map((newUserSettings) =>
            UserActions.changeUsersSettingsSuccess(newUserSettings)
          ),
          tap(() => {
            this.router.navigate(['/']);
          }),
          catchError((err) => {
            this.store.dispatch(
              UserActions.changeUsersSettingsFailure({
                error: err.error.message || 'Something went wrong',
              })
            );

            this.router.navigate(['/login']);
            return EMPTY;
          })
        );
      })
    )
  );
}
