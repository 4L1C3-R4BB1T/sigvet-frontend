import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import BaseService, { FilterParams } from '../base/base.service';
import { CreateUser } from '../models/create-user';
import { UpdateUser } from '../models/update-user';
import { User } from '../models/user';
import { PageModel } from '../models/page-model';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  public async searchByName(name: string) {
    return await lastValueFrom(this.http.get<User[]>(this.getEndpointV1('clients/search?name='+name)));
  }

  public async deleteById(id: number) {
    try {
      await lastValueFrom(this.http.delete(this.getEndpointV1(`clients/${id}`)));
      return true;
    } catch(ex: any) {
      this.handleException(ex);
      return false;
    }
  }

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get<PageModel<User[]>>(this.getEndpointV1(`clients${this.getFilterParams(filters)}`)));
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
      this.handleException(ex);
    }
    return null;
  }

  public async update(id: number, content: UpdateUser) {
    try {
      await lastValueFrom(this.http.put(this.getEndpointV1(`clients/${id}`), content));
      return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }

}
