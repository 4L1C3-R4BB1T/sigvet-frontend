import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import LoginComponent from './pages/login/login.component';
import { ViewAnimalInfoComponent } from './pages/animals/view-animal-info/view-animal-info.component';
import { UpdateAnimalComponent } from './pages/animals/update-animal/update-animal.component';
import { UpdateVaccineComponent } from './pages/vaccines/components/update-vaccine/update-vaccine.component';
import { ViewVaccineComponent } from './pages/vaccines/components/view-vaccine/view-vaccine.component';
import { UpdateVeterinarianComponent } from './pages/veterinarian/update-veterinarian/update-veterinarian.component';
import { UpdateClientComponent } from './pages/clients/update-client/update-client.component';
import { UpdateVaccinationComponent } from './pages/vaccinations/update-vaccination/update-vaccination.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.component'),
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
        children: [
          {
            path: 'novo',
            component: UpdateClientComponent,
            title: 'Veterinários',
          },
          {
            path: 'atualizar/:id',
            component: UpdateClientComponent,
            title: 'Veterinários',
          }
        ]
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
            title: 'Animais',
          },
          {
            path: 'atualizar/:id',
            component: UpdateAnimalComponent,
            title: 'Animais',
          },
          {
            path: 'visualizar/:id',
            component: ViewAnimalInfoComponent,
            title: 'Animais',
          },
        ]
      },
      {
        path: 'veterinarios',
        loadComponent: () => import('./pages/veterinarian/veterinarian.component'),
        title: 'Veterinários',
        children: [
          {
            path: 'novo',
            component: UpdateVeterinarianComponent,
            title: 'Veterinários',
          },
          {
            path: 'atualizar/:id',
            component: UpdateVeterinarianComponent,
            title: 'Veterinários',
          }
        ]
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
          {
            path: 'visualizar/:id',
            component: ViewVaccineComponent,
          }
        ],
      },
      {
        path: 'vacinacoes',
        loadComponent: () => import('./pages/vaccinations/vaccinations.component'),
        title: 'Vacinações',
        children: [
          {
            path: 'novo',
            component: UpdateVaccinationComponent,
            title: 'Vacinações - Novo'
          },
          {
            path: 'atualizar/:id',
            component: UpdateVaccinationComponent,
            title: 'Vacinações - Atualizar'
          }
        ]
      },
      {
        path: 'consultas',
        loadComponent: () => import('./pages/consults/consults.component'),
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
