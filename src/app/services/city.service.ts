import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import BaseService from "../base/base.service";
import { City } from "../models/city";

@Injectable()
export default class CityService extends BaseService {

  #http = inject(HttpClient);

  get findAll(): Observable<City[]> {
    return this.#http.get<City[]>(this.getEndpoint('cities'));
  }
}
