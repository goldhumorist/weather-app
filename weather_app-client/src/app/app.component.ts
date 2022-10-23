import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { isLoadingSelector } from './core/store/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {}

  isLoading$ = this.store.pipe(select(isLoadingSelector));
}
