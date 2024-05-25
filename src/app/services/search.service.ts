import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import { lastValueFrom } from 'rxjs';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {

  async searchVaccinesByName(name: string) {
    return await lastValueFrom(this.http.get<Vaccine[]>(this.getEndpointV1('vaccines/search?name='+name)));
  }

  async searchVeterinariansByName(name: string) {
    return await lastValueFrom(this.http.get<User[]>(this.getEndpointV1('veterinarians/search?name='+name)));
  }

  async searchAnimalsByName(name: string) {
    return await lastValueFrom(this.http.get<Animal[]>(this.getEndpointV1('animals/search?name='+name)));
  }

}
