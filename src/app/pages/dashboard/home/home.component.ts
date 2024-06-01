import { Component, OnInit, inject, signal } from '@angular/core';

import { ChartLineStylesComponent } from '../../../components/charts/chart-line-styles/chart-line-styles.component';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardStatusComponent } from '../components/dashboard-status/dashboard-status.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,

    ChartLineStylesComponent,
    DashboardStatusComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {}
