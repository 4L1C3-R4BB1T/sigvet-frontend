import { Component, OnInit, inject, signal } from '@angular/core';
import { GeneralMetrics, ReportService } from '../../../../services/report.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard-status',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard-status.component.html',
  styleUrl: './dashboard-status.component.scss'
})
export class DashboardStatusComponent implements OnInit {

  #reportService = inject(ReportService);

  generalMetrics = signal({} as GeneralMetrics | null);

  async ngOnInit() {
    this.generalMetrics.set((await this.#reportService.fetchGeneralMetrics())!);
  }

  calcPercent(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }
    return ((current - previous) / previous) * 100;
  }

  calcPercentForClients() {
    if (!this.generalMetrics()) return null;
    const { totalClientsCurrentMonth, totalClientsPreviousMonth } = this.generalMetrics()!;
    return this.calcPercent(totalClientsCurrentMonth, totalClientsPreviousMonth);
  }

  calcPercentForAnimals() {
    if (!this.generalMetrics()) return null;
    const { totalAnimalsCurrentMonth, totalAnimalsPreviousMonth } = this.generalMetrics()!;
    return this.calcPercent(totalAnimalsCurrentMonth, totalAnimalsPreviousMonth);
  }

  calcPercentForConsults() {
    if (!this.generalMetrics()) return null;
    const { totalConsultsCurrentMonth, totalConsultsPreviousMonth } = this.generalMetrics()!;
    return this.calcPercent(totalConsultsCurrentMonth, totalConsultsPreviousMonth);
  }

  calcPercentForRevenue() {
    if (!this.generalMetrics()) return null;
    const { totalRevenueCurrentMonth, totalRevenuePreviousMonth } = this.generalMetrics()!;
    return this.calcPercent(totalRevenueCurrentMonth, totalRevenuePreviousMonth);
  }

}
