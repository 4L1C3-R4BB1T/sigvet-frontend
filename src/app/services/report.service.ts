import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import BaseService from '../base/base.service';

export interface MonthAndCount {
  month: number;
  count: number;
}

export interface MonthlyAnimalsAndClients {
  animalsResult: MonthAndCount[];
  clientsResult: MonthAndCount[];
}

export interface GeneralMetrics {
  totalClientsCurrentMonth: number;
  totalAnimalsCurrentMonth: number;
  totalConsultsCurrentMonth: number;
  totalRevenueCurrentMonth: number;
  totalClientsPreviousMonth: number;
  totalAnimalsPreviousMonth: number;
  totalConsultsPreviousMonth: number;
  totalRevenuePreviousMonth: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  async downloadReports() {
    try {
     const [generalMetricsBlob, monthlyMetricsAnimalsBlob, monthlyMetricsClientsBlob] = await Promise.all([
        lastValueFrom(this.http.get(this.getEndpointV1('reports/general-metrics/excel'), { responseType: 'blob' })),
        lastValueFrom(this.http.get(this.getEndpointV1('reports/monthly-metrics/animals/excel'), { responseType: 'blob' })),
        lastValueFrom(this.http.get(this.getEndpointV1('reports/monthly-metrics/clients/excel'), { responseType: 'blob' }))
      ]);

      this.downloadFile(generalMetricsBlob, 'general-metrics-report.xlsx');
      this.downloadFile(monthlyMetricsAnimalsBlob, 'monthly-metrics-animals-report.xlsx');
      this.downloadFile(monthlyMetricsClientsBlob, 'monthly-metrics-clients-report.xlsx');
    } catch (ex: any) {
      console.log(ex);
    }
  }

  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  async fetchGeneralMetrics() {
    try {
      const data = await lastValueFrom(this.http.get<GeneralMetrics>(this.getEndpointV1('reports/general-metrics')));
      return data;
    } catch (ex: any) {
      this.handleException(ex);
      return null;
    }
  }

  async fetchMonthlyAnimalsAndClients() {
    try {
      const data = await lastValueFrom(this.http.get<MonthlyAnimalsAndClients>(this.getEndpointV1('reports/monthly-metrics')));
      return data;
    } catch (ex: any) {
      this.handleException(ex);
      return null;
    }
  }

}
