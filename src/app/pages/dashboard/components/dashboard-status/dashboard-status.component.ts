import { Component, OnInit, inject, signal } from '@angular/core';
import { GeneralMetrics, ReportService } from '../../../../services/report.service';

@Component({
  selector: 'app-dashboard-status',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-status.component.html',
  styleUrl: './dashboard-status.component.scss'
})
export class DashboardStatusComponent implements OnInit {

  #reportService = inject(ReportService);

  generalMetrics = signal({} as GeneralMetrics);

  async ngOnInit() {
    this.generalMetrics.set((await this.#reportService.fetchGeneralMetrics())!);
    console.log(this.generalMetrics())
  }

  calcPercent(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  }

  calcPercentForClients() {
    const { totalClientsCurrentMonth, totalClientsPreviousMonth } = this.generalMetrics();
    return this.calcPercent(totalClientsCurrentMonth, totalClientsPreviousMonth);
  }

  calcPercentForAnimals() {
    const { totalAnimalsCurrentMonth, totalAnimalsPreviousMonth } = this.generalMetrics();
    return this.calcPercent(totalAnimalsCurrentMonth, totalAnimalsPreviousMonth);
  }

  calcPercentForConsults() {
    const { totalConsultsCurrentMonth, totalConsultsPreviousMonth } = this.generalMetrics();
    return this.calcPercent(totalConsultsCurrentMonth, totalConsultsPreviousMonth);
  }

  calcPercentForRevenue() {
    const { totalRevenueCurrentMonth, totalRevenuePreviousMonth } = this.generalMetrics();
    return this.calcPercent(totalRevenueCurrentMonth, totalRevenuePreviousMonth);
  }

}
