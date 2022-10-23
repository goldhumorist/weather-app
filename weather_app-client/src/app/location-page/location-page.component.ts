import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import * as UserActions from '../core/store/user/user.actions';
import { userCitySelector } from '../core/store/user/user.selectors';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss'],
})
export class LocationPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store) {}

  private destroySubject$ = new Subject<void>();
  initialCityFromStore: string | null = null;

  ngOnInit() {
    this.store
      .pipe(select(userCitySelector), takeUntil(this.destroySubject$))
      .subscribe((city) => {
        if (city) this.initialCityFromStore = city;
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
