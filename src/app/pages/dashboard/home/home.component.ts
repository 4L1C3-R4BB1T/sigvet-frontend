import { Component, OnInit, signal } from '@angular/core';

import { ChartLineStylesComponent } from '../../../components/charts/chart-line-styles/chart-line-styles.component';
import { SharedModule } from '../../../shared/shared.module';
import { DashboardStatusComponent } from '../components/dashboard-status/dashboard-status.component';

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
export default class HomeComponent implements OnInit {

  public isLoading = signal(false);

  public ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 200);
  }
  
}
