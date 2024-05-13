import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import BaseService from "../base/base.service";
import { City } from "../models/city";

@Injectable()
export default class CityService extends BaseService {

  get findAll(): Observable<City[]> {
    return this.http.get<City[]>(this.getEndpointV1('cities'));
  }
}
