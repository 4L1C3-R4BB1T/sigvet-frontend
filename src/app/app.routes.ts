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
            title: 'Clientes/Novo',
          },
          {
            path: 'atualizar/:id',
            component: UpdateClientComponent,
            title: 'Clientes/Atualizar',
          },
          {
            path: 'visualizar/:id',
            component: ViewClientComponent,
            title: 'Clientes/Visualizar',
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
            title: 'Veterinários/Novo',
          },
          {
            path: 'atualizar/:id',
            component: UpdateVeterinarianComponent,
            title: 'Veterinários/Atualizar',
          },
          {
            path: 'visualizar/:id',
            component: ViewVeterinarianComponent,
            title: 'Veterinários/Visualizar',
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
            title: 'Vacinas/Novo',
          },
          {
            path: 'atualizar/:id',
            component: UpdateVaccineComponent,
            title: 'Vacinas/Atualizar',
          },
          {
            path: 'visualizar/:id',
            component: ViewVaccineComponent,
            title: 'Vacinas/Visualizar',
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
            title: 'Vacinações/Novo'
          },
          {
            path: 'atualizar/:id',
            component: UpdateVaccinationComponent,
            title: 'Vacinações/Atualizar'
          },
          {
            path: 'visualizar/:id',
            component: ViewVaccinationComponent,
            title: 'Vacinações/Visualizar'
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
            title: 'Consultas/Novo'
          },
          {
            path: 'atualizar/:id',
            component: UpdateConsultComponent,
            title: 'Consultas/Atualizar'
          },
          {
            path: 'visualizar/:id',
            component: ViewConsultComponent,
            title: 'Consultas/Visualizar'
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
            title: 'Diagnósticos/Novo'
          },
          {
            path: 'atualizar/:id',
            component: UpdateDiagnosticComponent,
            title: 'Diagnósticos/Atualizar'
          },
          {
            path: 'visualizar/:id',
            component: ViewDiagnosticComponent,
            title: 'Diagnósticos/Visualizar'
          }
        ]
      }
    ],
  },
];
