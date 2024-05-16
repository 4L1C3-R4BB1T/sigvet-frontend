import { NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import BaseStoreComponent from '../../base/base-store.component';
import { AuthService } from '../../services/auth.service';
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
export class SidenavComponent extends BaseStoreComponent implements OnInit {

  #authService = inject(AuthService);

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
      routeLink: '/dashboard/vacinacoes',
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
      routeLink: '/dashboard/diagnosticos',
      label: 'Diagnósticos',
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

  showMenuSidenav = toSignal(this.store.select(state => state.menuVisibilityReducer.menuSidenav))

  public ngOnInit(): void {

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

  public signOut() {
    this.#authService.signOut();
  }

}
