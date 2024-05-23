import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import BaseService, { FilterParams } from '../base/base.service';
import { Animal } from '../models/animal';
import { UpdateAnimal } from '../models/create-animal';
import { PageModel } from '../models/page-model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseService {

  public async findAllByClientId(id: number) {
    return await lastValueFrom(this.http.get<Animal[]>(this.getEndpointV1('animals/client/'+id)));
  }

  public async savePhoto(id: number | string, file: File) {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      await lastValueFrom(this.http.put(this.getEndpointV1('photo/animal/'+id), formData));
      return true;
    } catch (ex: any) {
      this.handleException(ex);
      return false;
    }
  }

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get<PageModel<Animal>>(this.getEndpointV1(`animals${this.getFilterParams(filters)}`)));
  }

  public async findById(id: number) {
    try {
      return await lastValueFrom(this.http.get(this.getEndpointV1(`animals/${id}`))
      .pipe(map((response: any) => response?.result as Animal)))
    } catch (ex: any) {
      return null;
    }
  }

  public async create(content: UpdateAnimal) {
    try {
      return await lastValueFrom(this.http.post(this.getEndpointV1('animals'), content)
        .pipe(map((response: any) => response.result as Animal)));
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }


  public async update(id: number, content: UpdateAnimal) {
    try {
     await lastValueFrom(this.http.put(this.getEndpointV1(`animals/${id}`), content));
     console.log('oii')
     return true;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return false;
  }


  public async deleteById(id: number) {
    await lastValueFrom(this.http.delete(this.getEndpointV1(`animals/${id}`)));
  }
}
