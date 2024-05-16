import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, lastValueFrom, of } from 'rxjs';
import BaseService from '../base/base.service';
import { APIResponseError } from '../models/api-response-error';
import { CreateUser } from '../models/create-user';
import { User } from '../models/user';
import { AppState } from '../store';
import { UserActions, selectUserInfo } from '../store/reducers/user.reducer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  private authService = inject(AuthService);
  private store = inject<Store<AppState>>(Store);
  private userInfo = this.store.selectSignal(selectUserInfo);

  public async create(record: CreateUser) {
    try {
      await lastValueFrom(this.http.post(this.getEndpointV1('account'), record));
      await this.authService.authenticate(record as User, this);
    } catch (ex: any) {
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
  }

  public loadUserPhoto(): void {
    if (!this.userInfo()) return;
    this.store.dispatch(UserActions.setUserPhoto({ url: '' }));
    setTimeout(() => {
      this.store.dispatch(UserActions.setUserPhoto({ url: this.getEndpointV1(`photo/user/${this.userInfo()!.id}`) }));
    }, 200);
  }

  public async addPhoto(file: File) {
    if (!this.userInfo()) return;
    const formData = new FormData();
    formData.append('photo', file);
    await lastValueFrom(this.http.put(this.getEndpointV1(`photo/user/${this.userInfo()!.id}`), formData).pipe(catchError(ex => {
      if (ex['error']) {
        const error = ex['error'] as { result: string | string[] };
        if (error.result instanceof Array) {
          for (const messageError of error.result) {
            this.toastrService.info(messageError);
          }
        } else {
          this.toastrService.info(error.result);
        }
      }
      return of();
    })
    ));
    this.loadUserPhoto();
  }
}
