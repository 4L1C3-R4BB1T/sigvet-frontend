import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../store';
import { toggle } from '../../store/actions/setting-menu.action';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import { ProfileComponent } from '../profile/profile.component';

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
  imports: [RouterLink, NgIf, MenuMobileComponent, RouterLinkActive, NgIf, ProfileComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  menus: SidenavMenu[] = [
    {
      iconUrl: 'assets/icons/dashboard/home.svg',
      routeLink: '/dashboard',
      label: 'Home',
    },
    {
      iconUrl: 'assets/icons/dashboard/clients.svg',
      routeLink: '/dashboard/clientes',
      label: 'Clientes',
    },
    {
      iconUrl: 'assets/icons/dashboard/animals.svg',
      routeLink: '/dashboard/animais',
      label: 'Animais',
    },
    {
      iconUrl: 'assets/icons/dashboard/vets.svg',
      routeLink: '//dashboard/veterinarios',
      label: 'Veterinários',
    },
    {
      iconUrl: 'assets/icons/dashboard/vaccines.svg',
      routeLink: '/dashboard/vacinas',
      label: 'Vacinas',
    },
    {
      iconUrl: 'assets/icons/dashboard/visits.svg',
      routeLink: '/dashboard/consultas',
      label: 'Consultas',
    },
    {
      iconUrl: 'assets/icons/dashboard/diagnoses.svg',
      label: 'Diagnósticos',
      routeLink: '/dashboard/diagnosticos'
    },
    {
      iconUrl: 'assets/icons/dashboard/vaccinations.svg',
      label: 'Vacinações',
      routeLink: '/dashboard/vacinacoes'
    }
  ];

  submenus = signal([
    {
      iconUrl: 'assets/icons/dashboard/reports.svg',
      label: 'Relatórios',
      openSubmenu: false,
      submenus: [
        {
          routeLink: '/',
          label: 'Faturamento',
        },
        {
          routeLink: '/',
          label: 'Consultas',
        },
      ],
    },
    {
      iconUrl: 'assets/icons/dashboard/docs.svg',
      label: 'Documentos',
      submenus: [
        {
          routeLink: '/',
          label: 'Word (.docx)',
        },
        {
          routeLink: '/',
          label: 'Excel (.xls)',
        },
      ],
    }
  ] as SidenavMenu[]);

  #store = inject<Store<AppState>>(Store);

  isSeeMore = signal(false);

  showMenu = toSignal(this.#store.select((state: AppState) => state.menu.show));

  showSettingMenu = toSignal(this.#store.select(state => state['settingMenu'].open));

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

  public showSettingMenuFnc() {
    this.#store.dispatch(toggle());
  }

}
