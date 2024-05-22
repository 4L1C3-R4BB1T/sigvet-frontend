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
