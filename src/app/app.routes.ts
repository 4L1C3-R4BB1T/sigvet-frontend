import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import LoginComponent from './pages/login/login.component';
import { ViewAnimalInfoComponent } from './pages/animals/view-animal-info/view-animal-info.component';
import { UpdateAnimalComponent } from './pages/animals/update-animal/update-animal.component';
import { UpdateVaccineComponent } from './pages/vaccines/components/update-vaccine/update-vaccine.component';

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
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        title: 'Animais',
        children: [
          {
            path: 'novo',
            component: UpdateAnimalComponent,
          },
          {
            path: 'atualizar/:id',
            component: UpdateAnimalComponent,
          },
          {
            path: 'visualizar/:id',
            component: ViewAnimalInfoComponent,
          },
        ]
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
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
          {
            path: 'novo',
            component: UpdateVaccineComponent,
          },
          {
            path: 'atualizar/:id',
            component: UpdateVaccineComponent,
          },
        ],
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
