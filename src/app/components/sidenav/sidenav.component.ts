import { NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import BaseStoreComponent from '../../base/base-store.component';
import { DialogExitComponent } from '../../shared/components/dialog/dialog-exit.component';
import {
  selectMenuSidenavValue
} from '../../store/reducers/menu-visibility.reducer';
import { selectUserInfo, selectUserPhoto } from '../../store/reducers/user.reducer';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../services/account.service';

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
    MatButtonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent extends BaseStoreComponent implements OnInit {
  dialog = inject<MatDialog>(MatDialog);
  drawerOpen = this.store.selectSignal(selectMenuSidenavValue);
  userInfo = this.store.selectSignal(selectUserInfo);
  #accountService = inject(AccountService);
  
  menus = signal<SidenavMenu[]>([]);
  showMore = signal(false);

  menusPartial: SidenavMenu[] = [
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
  ];


  menusCompleto: SidenavMenu[] = [
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
    {
      iconUrl: 'assets/icons/sidenav/consult.svg',
      routeLink: '/dashboard/consultas',
      label: 'Consultas',
    },
    {
      iconUrl: 'assets/icons/sidenav/diagnoses.svg',
      label: 'Diagnóstico',
      routeLink: '/dashboard/diagnosticos'
    },
  ];


  isSeeMore = signal(false);

  showMenuSidenav = this.store.selectSignal(selectMenuSidenavValue);

  userPhoto = this.store.selectSignal(selectUserPhoto);


  public ngOnInit() {
    this.menus.set(this.menusPartial);
  }

  public openExitDialog() {
    this.dialog.open(DialogExitComponent, {
      width: '400px',
    });
  }
  public seeMoreMenu() {
    this.menus.update(() => !this.showMore() ? this.menusCompleto : this.menusPartial );
    this.showMore.set(!this.showMore());
  }

  public async addPhoto(fileList: FileList | null) {
    if (!fileList || fileList.length == 0) return;
    await this.#accountService.addPhoto(fileList.item(0)!);
  }

}
