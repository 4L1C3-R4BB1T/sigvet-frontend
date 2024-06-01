import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { ActivationStart, Router, RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { filter, map } from 'rxjs';
import { UserRolePipe } from '../../pipes/user-role.pipe';
import { UserService } from '../../services/user-service.service';
import { ProfileActions, selectMenuSidenavValue } from '../../store/reducers/menu-visibility.reducer';
import { selectUserInfo, selectUserPhoto } from '../../store/reducers/user.reducer';
import { MenuHamburguerComponent } from '../menu-hamburguer/menu-hamburguer.component';
import BaseComponent from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogExitComponent } from '../../shared/components/dialog/dialog-exit.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserRolePipe, MenuHamburguerComponent, MatMenuModule, MatRippleModule, NgIf, BadgeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends BaseComponent implements OnInit {

  openMenu = signal(false);
  #router = inject(Router);
  dialog = inject<MatDialog>(MatDialog);

  currentTitle = signal('Home');
  userInfo = this.store.selectSignal(selectUserInfo);
  userPhoto = this.store.selectSignal(selectUserPhoto);
  isOpenMenuSidenav = this.store.selectSignal(selectMenuSidenavValue);
  userService = inject(UserService);

  solicitationCount = signal(0);

  public ngOnInit() {
    this.userService.findByViewerRole().then(result => this.solicitationCount.set(result.length ?? 0));
    this.#router.events.pipe(
      filter(event => event instanceof ActivationStart),
      map(event => event as ActivationStart))
      .subscribe(event => this.currentTitle.set(event.snapshot.routeConfig?.title as string));
  }

  showProfileMenu() {
    this.store.dispatch(ProfileActions.toggleModal());
  }

  public openExitDialog() {
    this.dialog.open(DialogExitComponent, {
      width: '400px',
    });
  }
}
