import { Routes } from '@angular/router';
import AccountComponent from './pages/account/account.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'account',
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/account/login-form/login-form.component'),
      }
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/home/home.component'),
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clients/clients.component'),
        title: 'Clientes',
      },
      {
        path: 'animais',
        loadComponent: () => import('./pages/animals/animals.component'),
        title: 'Animais',
      },
      {
        path: 'consultas',
        loadComponent: () => import('./pages/consultations/consultations.component'),
        title: 'Consultas',
      },
      {
        path: 'vacinacoes',
        loadComponent: () => import('./pages/vaccinations/vaccinations.component'),
        title: 'Vacinações',
      },
      {
        path: 'veterinarios',
        loadComponent: () => import('./pages/veterinaries/veterinaries.component'),
        title: 'Veterinários',
      },
      {
        path: 'vacinas',
        loadComponent: () => import('./pages/vaccines/vaccines.component'),
        title: 'Vacinas',
      }
    ],
  },
];
