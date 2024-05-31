import { Injectable } from '@angular/core';
import BaseService from '../base/base.service';
import { catchError, first, lastValueFrom, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  findByViewerRole() {
    return lastValueFrom(this.http.get<User[]>(this.getEndpointV1('users/in-view-role'))
      .pipe(catchError((ex: any) => {
        this.handleException(ex);
        return of();
      }
    ),
    first()));
  }

  async deleteById(id: number) {
    return lastValueFrom(this.http.delete(this.getEndpointV1('users/'+id)));
  }

  async searchByTermAndViewerRole(term: string) {
    return lastValueFrom(this.http.get<User[]>(this.getEndpointV1('users/in-view-role/search?term='+term)));
  }
}
