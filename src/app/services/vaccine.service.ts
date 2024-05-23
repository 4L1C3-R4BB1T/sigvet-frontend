import { Injectable } from '@angular/core';
import BaseService, { FilterParams } from '../base/base.service';
import { lastValueFrom, map } from 'rxjs';
import { Vaccine } from '../models/vaccine';
import { UpdateVaccine } from '../models/update-vaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService extends BaseService {

  public async getTotalOfUses(id: number) {
    try {
      return await lastValueFrom(this.http.get<{ count: number }>(this.getEndpointV1('reports/vaccine-uses/'+id+'/total-count')));
    } catch(ex: any) {
      this.handleException(ex);
      return null;
    }
  }

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`vaccines${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as Vaccine[])));
  }

  public async findById(id: number) {
    try {
      return await lastValueFrom(this.http.get(this.getEndpointV1(`vaccines/${id}`))
      .pipe(map((response: any) => response?.result as Vaccine)))
    } catch (ex: any) {
      return null;
    }
  }

  public async create(content: UpdateVaccine) {
    try {
      return await lastValueFrom(this.http.post(this.getEndpointV1('vaccines'), content)
        .pipe(map((response: any) => response.result as Vaccine)));
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }


  public async update(id: number, content: UpdateVaccine) {
    try {
     await lastValueFrom(this.http.put(this.getEndpointV1(`vaccines/${id}`), content));
     return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }


  public async deleteById(id: number) {
    await lastValueFrom(this.http.delete(this.getEndpointV1(`vaccines/${id}`)));
  }
}
