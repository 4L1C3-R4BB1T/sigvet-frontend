import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import BaseService from '../base/base.service';
import { APIResponseError } from '../models/api-response-error';
import { CreateUser } from '../models/create-user';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  private authService = inject(AuthService);

  public async create(record: CreateUser) {
    try {
      await lastValueFrom(this.http.post(this.getEndpointV1('account'), record));
      await this.authService.authenticate(record as User);
    } catch (ex: any) {
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
  }

}
