import { Injectable } from '@angular/core';
import BaseService, { FilterParams } from '../base/base.service';
import { lastValueFrom, map } from 'rxjs';
import { UpdateVaccination } from '../models/update-vaccination';
import { Vaccination } from '../models/vaccination';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService extends BaseService {

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`vaccinations${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as Vaccination[])));
  }

  public async findById(id: number) {
    try {
      return await lastValueFrom(this.http.get(this.getEndpointV1(`vaccinations/${id}`))
      .pipe(map((response: any) => response?.result as Vaccination)))
    } catch (ex: any) {
      return null;
    }
  }

  public async create(content: UpdateVaccination) {
    try {
      return await lastValueFrom(this.http.post(this.getEndpointV1('vaccinations'), content)
        .pipe(map((response: any) => response.result as UpdateVaccination)));
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }


  public async update(id: number, content: UpdateVaccination) {
    try {
     await lastValueFrom(this.http.put(this.getEndpointV1(`vaccinations/${id}`), content));
     return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }


  public async deleteById(id: number) {
    await lastValueFrom(this.http.delete(this.getEndpointV1(`vaccinations/${id}`)));
  }
}
