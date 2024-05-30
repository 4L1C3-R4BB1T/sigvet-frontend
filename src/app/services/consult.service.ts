import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import BaseService, { FilterParams } from '../base/base.service';
import { Consult } from '../models/consult';
import { UpdateConsult } from '../models/update-consult';
import { PageModel } from '../models/page-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultService extends BaseService {

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get<PageModel<Consult[]>>(this.getEndpointV1(`consults${this.getFilterParams(filters)}`)));
  }
 
  public async findById(id: number) {
    try {
      return await lastValueFrom(this.http.get(this.getEndpointV1(`consults/${id}`))
      .pipe(map((response: any) => response?.result as Consult)))
    } catch (ex: any) {
      return null;
    }
  }

  public async create(content: UpdateConsult) {
    try {
      return await lastValueFrom(this.http.post(this.getEndpointV1('consults'), content)
        .pipe(map((response: any) => response.result as UpdateConsult)));
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }


  public async update(id: number, content: UpdateConsult) {
    try {
     await lastValueFrom(this.http.put(this.getEndpointV1(`consults/${id}`), content));
     return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }


  public async deleteById(id: number) {
    await lastValueFrom(this.http.delete(this.getEndpointV1(`consults/${id}`)));
  }
}
