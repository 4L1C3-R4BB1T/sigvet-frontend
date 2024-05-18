import { Injectable } from '@angular/core';
import { lastValueFrom, map, tap } from 'rxjs';
import BaseService, { FilterParams } from '../base/base.service';
import { APIResponseError } from '../models/api-response-error';
import { CreateUser } from '../models/create-user';
import { UpdateUser } from '../models/update-user';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  public async deleteById(id: number) {
    try {
      await lastValueFrom(this.http.delete(this.getEndpointV1(`clients/${id}`)));
      this.toastrService.success('Deletado');
    } catch(ex: any) {
      this.toastrService.error('Não deletado');
    }
  }

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
      return await lastValueFrom(this.http.post(this.getEndpointV1('clients'), record)
        .pipe(map((response: any) => response.result as { id: number })));
    } catch (ex: any) {
      console.log(ex)
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
    return null;
  }

  public async update(id: number, content: UpdateUser) {
    try {
      await lastValueFrom(this.http.put(this.getEndpointV1(`clients/${id}`), content));
      return true;
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
    return false;
  }
}
