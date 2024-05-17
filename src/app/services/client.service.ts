import { Injectable } from '@angular/core';
import BaseService, { FilterParams } from '../base/base.service';
import { lastValueFrom, map } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`clients${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as User[])));
  }
}
