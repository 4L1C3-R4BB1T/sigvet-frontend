import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import { lastValueFrom } from 'rxjs';

export interface FilterParams {
  equal_filters: string;
  in_filters: string;
  sort: string;
  size: string;
  page: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  public async findAll(filterParams?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1('clients')));
  }
}
