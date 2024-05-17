import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import BaseStoreComponent from '../../base/base-store.component';
import { selectUserInfo, selectUserPhoto } from '../../store/reducers/user.reducer';
import { UserRolePipe } from '../../pipes/user-role.pipe';
import { MenuHamburguerComponent } from '../menu-hamburguer/menu-hamburguer.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import { ProfileActions } from '../../store/reducers/menu-visibility.reducer';

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

  public ngOnInit() {
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd))
      .subscribe(event => {
        var url = event.urlAfterRedirects.replace('/dashboard/', '');
        if (url.startsWith('/dashboard')) {
          this.currentTitle.set('Home');
        } else {
          this.currentTitle.set(`${url[0].toUpperCase()}${url.substring(1)}`);
        }
      });
  }

  showProfileMenu() {
    this.store.dispatch(ProfileActions.toggleModal());
  }
}
