import { NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GeneralMetrics, ReportService } from '../../../../services/report.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dashboard-status',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatTooltipModule],
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
    return parseFloat((((current - previous) / previous) * 100).toFixed(2));
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

  downloadReports() {
    this.#reportService.downloadReports();
  }

}
