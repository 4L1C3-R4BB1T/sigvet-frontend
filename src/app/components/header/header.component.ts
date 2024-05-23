import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

import BaseStoreComponent from '../../base/base-store.component';
import { selectUserInfo, selectUserPhoto } from '../../store/reducers/user.reducer';
import { UserRolePipe } from '../../pipes/user-role.pipe';
import { MenuHamburguerComponent } from '../menu-hamburguer/menu-hamburguer.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import { ProfileActions, selectMenuSidenavValue } from '../../store/reducers/menu-visibility.reducer';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserRolePipe, MenuHamburguerComponent, MatMenuModule, MatRippleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends BaseStoreComponent implements OnInit {

  openMenu = signal(false);
  #router = inject(Router);

  currentTitle = signal('Home');
  userInfo = this.store.selectSignal(selectUserInfo);
  userPhoto = this.store.selectSignal(selectUserPhoto);
  isOpenMenuSidenav = this.store.selectSignal(selectMenuSidenavValue);

  public ngOnInit() {
    this.#router.events.pipe(
      filter(event => event instanceof ActivationStart),
      map(event => event as ActivationStart))
      .subscribe(event => this.currentTitle.set(event.snapshot.routeConfig?.title as string));
  }

  showProfileMenu() {
    this.store.dispatch(ProfileActions.toggleModal());
  }
}
