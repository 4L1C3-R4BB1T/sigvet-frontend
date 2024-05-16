import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import BaseStoreComponent from '../../base/base-store.component';
import { DialogExitComponent } from '../../shared/components/dialog/dialog-exit.component';
import { selectUserPhoto } from '../../store/reducers/user.reducer';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';

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
  imports: [RouterLink, NgIf, MenuMobileComponent, RouterLinkActive, NgIf],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent extends BaseStoreComponent {

  dialog = inject<MatDialog>(MatDialog);

  menus: SidenavMenu[] = [
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
      routeLink: '/dashboard/vacinacoes'
    }
  ];

  submenus = signal([
    {
      iconUrl: 'assets/icons/sidenav/consult.svg',
      routeLink: '/dashboard/consultas',
      label: 'Consultas',
    },
    {
      iconUrl: 'assets/icons/sidenav/diagnoses.svg',
      label: 'Diagnósticos',
      routeLink: '/dashboard/diagnosticos'
    },
    {
      iconUrl: 'assets/icons/sidenav/reports.svg',
      label: 'Relatórios',
      openSubmenu: false,
      submenus: [
        {
          iconUrl: 'assets/icons/sidenav/money.svg',
          routeLink: '/',
          label: 'Faturamento',
        },
        {
          iconUrl: 'assets/icons/sidenav/consults.svg',
          routeLink: '/',
          label: 'Consultas',
        },
      ],
    },
  ] as SidenavMenu[]);


  isSeeMore = signal(false);

  showMenuSidenav = this.store.selectSignal(state => state.menuVisibilityReducer.menuSidenav);

  userPhoto = this.store.selectSignal(selectUserPhoto);

  public openExitDialog() {
    this.dialog.open(DialogExitComponent, {
      width: '400px',
    });
  }
  public seeMore() {
    this.isSeeMore.set(!this.isSeeMore());
  }

  public openSubmenus(targetIndex: number | null) {
    this.submenus.update(old => old.map((obj, index) => {
      if (obj.openSubmenu) {
        obj.openSubmenu = false;
      } else {
        obj.openSubmenu = targetIndex == index;
      }
      return obj;
    }))
  }

}
