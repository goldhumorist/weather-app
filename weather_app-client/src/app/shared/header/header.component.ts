import { userCitySelector } from './../../core/store/user/user.selectors';
import { Store, select } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store) {}

  city$ = this.store.pipe(select(userCitySelector));
  menuIsOpen: boolean = false;

  ngOnInit(): void {}

  togleMenu() {
    this.menuIsOpen = this.menuIsOpen ? false : true;
  }
}
