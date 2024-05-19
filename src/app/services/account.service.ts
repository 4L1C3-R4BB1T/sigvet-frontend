import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, lastValueFrom, map, of, tap } from 'rxjs';
import BaseService from '../base/base.service';
import { APIResponseError } from '../models/api-response-error';
import { CreateUser } from '../models/create-user';
import { AppState } from '../store';
import { UserActions, selectUserInfo } from '../store/reducers/user.reducer';
import { AuthService } from './auth.service';
import { UserLogin } from '../models/user-login';
import { RecoverUser } from '../models/recover-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  private authService = inject(AuthService);
  private store = inject<Store<AppState>>(Store);
  private userInfo = this.store.selectSignal(selectUserInfo);

  public async recover(content: RecoverUser) {
    try {
      const result = await lastValueFrom(this.http.post(this.getEndpointV1('account/recover'), content)
        .pipe(map((response: any) => response.result as boolean)));
      this.toastrService.success('Senha alterada', 'Conta');
      return result;
    } catch (ex: any) {
      this.handleException(ex);
    }
    return null;
  }

  public async findById(id: number) {
    return await lastValueFrom(this.http.get(this.getEndpointV1(`account/${id}`))
    .pipe(map((response: any) => response.result as User)));
  }


  public async create(record: CreateUser) {
    try {
      await lastValueFrom(this.http.post(this.getEndpointV1('account'), record));
      await this.authService.authenticate(record as UserLogin);
    } catch (ex: any) {
      this.handleException(ex);
    }
  }

  public async addPhoto(file: File) {
    if (!this.userInfo()) return;
    const formData = new FormData();
    formData.append('photo', file);
    await lastValueFrom(this.http.put(this.getEndpointV1(`photo/user/${this.userInfo()?.id}`), formData).pipe(catchError(ex => {
      this.handleException(ex);
      return of();
    })
    ));
    await this.loadUserPhoto();
  }

  public async addUserPhoto(file: File, userId: number) {
    const formData = new FormData();
    formData.append('photo', file);
    await lastValueFrom(this.http.put(this.getEndpointV1(`photo/user/${userId}`), formData).pipe(catchError(ex => {
      this.handleException(ex);
      return of();
    })
    ));
  }

  public async loadUserPhoto() {
      if (!this.userInfo()) return;
      const user = await lastValueFrom(this.http.get(this.getEndpointV1(`account/${this.userInfo()?.id}`))
        .pipe(map((response: any) => response.result), tap(console.log)));
      this.store.dispatch(UserActions.setUserInfo(null!));
      setTimeout(() => this.store.dispatch(UserActions.setUserInfo(user)), 100);
  }


}
