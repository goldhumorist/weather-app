import { userEmailSelector } from './../store/user/user.selectors';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, catchError, tap, of, map, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as UserActions from '../store/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.checkUserStatusAndUpdateStore().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => {
        return this.router.navigate(['/login']);
      })
    );
  }

  checkUserStatusAndUpdateStore() {
    return this.store.pipe(
      select(userEmailSelector),
      switchMap((email) => {
        if (email) return of([]);

        this.store.dispatch(UserActions.checkUserAuthInit());

        return this.authService.checkUserAuth().pipe(
          map((userData) => {
            this.store.dispatch(UserActions.checkUserAuthSuccess(userData));
          }),
          catchError((err) => {
            this.store.dispatch(UserActions.checkUserAuthFailure(err?.error));
            throw err;
          })
        );
      })
    );
  }
}
