import { Router } from '@angular/router';
import { IUserState } from '../core/store/user/user.reducer';
import { userStateSelector } from '../core/store/user/user.selectors';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as UserActions from '../core/store/user/user.actions';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  private destroySubject$ = new Subject<void>();
  userData!: IUserState;

  ngOnInit() {
    this.store
      .pipe(select(userStateSelector), takeUntil(this.destroySubject$))
      .subscribe((userData) => {
        this.userData = userData;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  saveUserSettings(settingsData: { city: string; isNewsletter?: Boolean }) {
    this.store.dispatch(
      UserActions.changeUsersSettingsInit({
        city: settingsData.city,
        isNewsletter: !!settingsData.isNewsletter,
      })
    );
  }

  navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
