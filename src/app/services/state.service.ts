import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import { lastValueFrom } from 'rxjs';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseService {

  async findAll() {
    return lastValueFrom(this.http.get<State[]>(this.getEndpointV1('states')));
  }
}
