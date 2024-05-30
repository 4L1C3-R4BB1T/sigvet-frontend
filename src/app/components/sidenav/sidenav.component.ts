import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, effect, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import BaseStoreComponent from '../../base/base.component';
import { AccountService } from '../../services/account.service';
import { DialogExitComponent } from '../../shared/components/dialog/dialog-exit.component';
import {
  selectMenuSidenavValue
} from '../../store/reducers/menu-visibility.reducer';
import { selectUserInfo, selectUserPhoto } from '../../store/reducers/user.reducer';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
interface SidenavMenu {
  iconUrl: string;
  routeLink: string;
  label: string;
  iconStyles?: string;
  submenus?: SidenavMenu[];
  openSubmenu?: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive,
    NgIf,
    MatSidenavModule,
    HeaderComponent,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent extends BaseStoreComponent implements OnInit, OnDestroy {
  dialog = inject<MatDialog>(MatDialog);
  drawerOpen = this.store.selectSignal(selectMenuSidenavValue);
  userInfo = this.store.selectSignal(selectUserInfo);
  #accountService = inject(AccountService);

  @ViewChild('menu', { static: true })
  menu!: MatMenu;

  @ViewChild('menuShowMore', { static: true })
  menuShowMore!: MatMenu;

  toggleMenu = signal(false);

  toggleMenuShowMore = signal(false);

  menus = signal<SidenavMenu[]>(
    [
      {
        iconUrl: 'assets/icons/sidenav/home.svg',
        routeLink: '/dashboard',
        label: 'Home',
      },
      {
        iconUrl: 'assets/icons/sidenav/client.svg',
        routeLink: '/dashboard/clientes',
        label: 'Clientes',
      },
      {
        iconUrl: 'assets/icons/sidenav/animal.svg',
        routeLink: '/dashboard/animais',
        label: 'Animais',
      },
      {
        iconUrl: 'assets/icons/sidenav/veterinary.svg',
        routeLink: '/dashboard/veterinarios',
        label: 'Veterinários',
      },
      {
        iconUrl: 'assets/icons/sidenav/vaccine.svg',
        routeLink: '/dashboard/vacinas',
        label: 'Vacinas',
      },
      {
        iconUrl: 'assets/icons/sidenav/vaccination.svg',
        label: 'Vacinações',
        routeLink: '/dashboard/vacinacoes',
      },
    ]
  );
  toggleShowMore = signal(false);

  otherMenus = signal<SidenavMenu[]>([
    {
      iconUrl: 'assets/icons/sidenav/consult.svg',
      routeLink: '/dashboard/consultas',
      label: 'Consultas',
    },
    {
      iconUrl: 'assets/icons/sidenav/diagnoses.svg',
      label: 'Diagnóstico',
      routeLink: '/dashboard/diagnosticos'
    }
  ]);

  showMenuSidenav = this.store.selectSignal(selectMenuSidenavValue);

  userPhoto = this.store.selectSignal(selectUserPhoto);

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(this.menu.closed.subscribe(() => this.toggleMenu.set(false)));
    this.subscriptions.push(this.menuShowMore.closed.subscribe(() => this.toggleMenuShowMore.set(false)));
  }

  public openExitDialog() {
    this.dialog.open(DialogExitComponent, {
      width: '400px',
    });
  }

  public async addPhoto(fileList: FileList | null) {
    if (!fileList || fileList.length == 0) return;
    await this.#accountService.addPhoto(fileList.item(0)!);
  }

  async removePhoto() {
    if (!this.userInfo()) return;
    if (await this.#accountService.removePhotoByUserId(this.userInfo()?.id!)) {
      this.#accountService.toastrService.success('Removido', 'Foto');
      this.reloadPage();
    }
  }

  reloadPage() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
