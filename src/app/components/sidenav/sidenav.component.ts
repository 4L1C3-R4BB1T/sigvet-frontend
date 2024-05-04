import { NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import BaseComponent from '../../base/base-store.component';
import { MenuMobileComponent } from '../menu-mobile/menu-mobile.component';
import BaseStoreComponent from '../../base/base-store.component';

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
      iconUrl: 'assets/icons/dashboard/vaccinations.svg',
      label: 'Vacinações',
      routeLink: '/dashboard/vacinacoes'
    }
  ];

  submenus = signal([
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

}
