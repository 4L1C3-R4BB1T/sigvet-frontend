import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { UpdateAnimalComponent } from './pages/animals/update-animal/update-animal.component';
import { ViewAnimalInfoComponent } from './pages/animals/view-animal-info/view-animal-info.component';
import { UpdateClientComponent } from './pages/clients/update-client/update-client.component';
import { ViewClientComponent } from './pages/clients/view-client/view-client.component';
import { UpdateConsultComponent } from './pages/consults/update-consult/update-consult.component';
import { ViewConsultComponent } from './pages/consults/view-consult/view-consult.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewDiagnosticComponent } from './pages/diagnostics/view-diagnostic/view-diagnostic.component';
import LoginComponent from './pages/login/login.component';
import { UpdateVaccinationComponent } from './pages/vaccinations/update-vaccination/update-vaccination.component';
import { ViewVaccinationComponent } from './pages/vaccinations/view-vaccination/view-vaccination.component';
import { UpdateVaccineComponent } from './pages/vaccines/components/update-vaccine/update-vaccine.component';
import { ViewVaccineComponent } from './pages/vaccines/components/view-vaccine/view-vaccine.component';
import { UpdateVeterinarianComponent } from './pages/veterinarian/update-veterinarian/update-veterinarian.component';
import { ViewVeterinarianComponent } from './pages/veterinarian/view-veterinarian/view-veterinarian.component';
import { UpdateDiagnosticComponent } from './pages/diagnostics/update-diagnostic/update-diagnostic.component';
import { AwaitingReleaseComponent } from './pages/awaiting-release/awaiting-release.component';
import { onlyAdminGuard } from './guards/only-admin.guard';

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
        path: 'bloqueado',
        component: AwaitingReleaseComponent,
      },
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/home/home.component'),
        title: 'Home',
        canActivate: [onlyAdminGuard]
      },
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clients/clients.component'),
        title: 'Clientes',
        children: [
          {
            path: 'novo',
            component: UpdateClientComponent,
            title: 'Clientes',
          },
          {
            path: 'atualizar/:id',
            component: UpdateClientComponent,
            title: 'Clientes',
          },
          {
            path: 'visualizar/:id',
            component: ViewClientComponent,
            title: 'Clientes',
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
        path: 'usuarios-acesso',
        loadComponent: () => import('./pages/user-access/user-access.component'),
        title: 'Permissões',
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
          },
          {
            path: 'visualizar/:id',
            component: ViewVeterinarianComponent,
            title: 'Veterinários',
          },
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
            title: 'Vacinas',
          },
          {
            path: 'atualizar/:id',
            component: UpdateVaccineComponent,
            title: 'Vacinas',
          },
          {
            path: 'visualizar/:id',
            component: ViewVaccineComponent,
            title: 'Vacinas',
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
            title: 'Vacinações'
          },
          {
            path: 'atualizar/:id',
            component: UpdateVaccinationComponent,
            title: 'Vacinações'
          },
          {
            path: 'visualizar/:id',
            component: ViewVaccinationComponent,
            title: 'Vacinações'
          }
        ]
      },
      {
        path: 'consultas',
        loadComponent: () => import('./pages/consults/consults.component'),
        title: 'Consultas',
        children: [
          {
            path: 'novo',
            component: UpdateConsultComponent,
            title: 'Consultas'
          },
          {
            path: 'atualizar/:id',
            component: UpdateConsultComponent,
            title: 'Consultas'
          },
          {
            path: 'visualizar/:id',
            component: ViewConsultComponent,
            title: 'Consultas'
          }
        ]
      },
      {
        path: 'diagnosticos',
        loadComponent: () => import('./pages/diagnostics/diagnostics.component'),
        title: 'Diagnósticos',
        children: [
          {
            path: 'novo',
            component: UpdateDiagnosticComponent,
            title: 'Diagnósticos'
          },
          {
            path: 'atualizar/:id',
            component: UpdateDiagnosticComponent,
            title: 'Diagnósticos'
          },
          {
            path: 'visualizar/:id',
            component: ViewDiagnosticComponent,
            title: 'Diagnósticos'
          }
        ]
      }
    ],
  },
];
