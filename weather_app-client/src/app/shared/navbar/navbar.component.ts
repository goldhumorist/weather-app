import { LocalStorageService } from './../../core/services/local-storage.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../core/store/user/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store
  ) {}

  ngOnInit(): void {}
  logout() {
    this.localStorageService.removeAuthTokenFromLocalStorage();
    this.store.dispatch(UserActions.logout());
  }
}
