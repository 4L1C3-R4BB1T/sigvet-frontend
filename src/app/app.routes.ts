import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import LoginComponent from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/home/home.component'),
        title: 'Home'
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
        path: 'veterinarios',
        loadComponent: () => import('./pages/veterinarian/veterinarian.component'),
        title: 'Veterinários',
      },
      {
        path: 'vacinas',
        loadComponent: () => import('./pages/vaccines/vaccines.component'),
        title: 'Vacinas',
      },
      {
        path: 'vacinacoes',
        loadComponent: () => import('./pages/vaccinations/vaccinations.component'),
        title: 'Vacinações',
      },
      {
        path: 'consultas',
        loadComponent: () => import('./pages/consultations/consultations.component'),
        title: 'Consultas',
      },
      {
        path: 'diagnosticos',
        loadComponent: () => import('./pages/diagnostics/diagnostics.component'),
        title: 'Diagnósticos',
      }
    ],
  },
];
