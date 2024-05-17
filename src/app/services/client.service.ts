import { Injectable } from '@angular/core';
import BaseService, { FilterParams } from '../base/base.service';
import { lastValueFrom, map } from 'rxjs';
import { User } from '../models/user';
import { CreateUser } from '../models/create-user';
import { APIResponseError } from '../models/api-response-error';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`clients${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as User[])));
  }

  public async findById(id: number) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`clients/${id}`))
    .pipe(map((response: any) => response.result as User)));
  }

  public async create(record: CreateUser) {
    try {
      await lastValueFrom(this.http.post(this.getEndpointV1('clients'), record));
    } catch (ex: any) {
      if (!ex.error) {
        this.toastrService.error('Erro interno, tente mais tarde.');
        return;
      }
      const error = ex.error as APIResponseError;
      if (error.result instanceof Array) {
        const result = error.result as string[];
        for (const messageError of result) {
          this.toastrService.warning(messageError);
        }
      } else if (typeof error.result === 'string') {
        this.toastrService.warning(error.result)
      }
    }
  }
}
