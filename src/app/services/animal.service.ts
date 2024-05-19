import { Injectable } from '@angular/core';
import BaseService, { FilterParams } from '../base/base.service';
import { lastValueFrom, map } from 'rxjs';
import { Animal } from '../models/animal';
import { UpdateAnimal } from '../models/create-animal';
import { APIResponseError } from '../models/api-response-error';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseService {

  public async findAll(filters?: FilterParams) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`animals${this.getFilterParams(filters)}`))
      .pipe(map((response: any) => response.elements as Animal[])));
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


  public async update(id: number, content: UpdateAnimal) {
    try {
     await lastValueFrom(this.http.put(this.getEndpointV1(`animals/${id}`), content));
     return true;
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
    return false;
  }


  public async deleteById(id: number) {
    await lastValueFrom(this.http.delete(this.getEndpointV1(`animals/${id}`)));
  }
}
