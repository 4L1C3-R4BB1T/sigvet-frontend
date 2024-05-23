import { Injectable } from '@angular/core';
import BaseService, { FilterParams } from '../base/base.service';
import { lastValueFrom, map } from 'rxjs';
import { User } from '../models/user';
import { UpdateUser } from '../models/update-user';

@Injectable({
  providedIn: 'root'
})
export class VeterinarianService extends BaseService {

  public async searchByName(name: string) {
    return await lastValueFrom(this.http.get<User[]>(this.getEndpointV1('veterinarians/search?name='+name)));
  }

  public async deleteById(id: number) {
    try {
      await lastValueFrom(this.http.delete(this.getEndpointV1(`veterinarians/${id}`)));
      return true;
    } catch(ex: any) {
      this.handleException(ex);
      return false;
    }
  }

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`veterinarians${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as User[])));
  }

  public async findById(id: number) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`veterinarians/${id}`))
    .pipe(map((response: any) => response.result as User)));
  }

  public async create(record: UpdateUser) {
    try {
      return await lastValueFrom(this.http.post(this.getEndpointV1('veterinarians'), record)
        .pipe(map((response: any) => response.result as { id: number })));
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }

  public async update(id: number, content: UpdateUser) {
    try {
      await lastValueFrom(this.http.put(this.getEndpointV1(`veterinarians/${id}`), content));
      return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }

}
