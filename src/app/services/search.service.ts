import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import { lastValueFrom } from 'rxjs';
import { Vaccine } from '../models/vaccine';
import { User } from '../models/user';
import { Animal } from '../models/animal';
import { Vaccination } from '../models/vaccination';
import { Consult } from '../models/consult';
import { Diagnostic } from '../models/diagnostic';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService {

  async searchVaccinesByName(name: string) {
    return await lastValueFrom(this.http.get<Vaccine[]>(this.getEndpointV1('vaccines/search?name='+name)));
  }

  async searchVaccinationsByTerm(term: string) {
    return await lastValueFrom(this.http.get<Vaccination[]>(this.getEndpointV1('vaccinations/search?term='+term)));
  }

  async searchDiagnosticsByTerm(term: string) {
    return await lastValueFrom(this.http.get<Diagnostic[]>(this.getEndpointV1('diagnostics/search?term='+term)));
  }

  async searchConsultsByTerm(term: string) {
    return await lastValueFrom(this.http.get<Consult[]>(this.getEndpointV1('consults/search?term='+term)));
  }

  async searchVeterinariansByName(name: string) {
    return await lastValueFrom(this.http.get<User[]>(this.getEndpointV1('veterinarians/search?name='+name)));
  }

  async searchAnimalsByName(name: string) {
    return await lastValueFrom(this.http.get<Animal[]>(this.getEndpointV1('animals/search?name='+name)));
  }

  async searchClientsByName(name: string) {
    return await lastValueFrom(this.http.get<User[]>(this.getEndpointV1('clients/search?name='+name)));
  }

}
