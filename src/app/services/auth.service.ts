import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';
import BaseService from '../base/base.service';
import { APIResponseError } from '../models/api-response-error';
import { User } from '../models/user';
import { AppState } from '../store';
import { UserActions, UserInfo } from '../store/reducers/user.reducer';

const STORAGE_AUTH_KEY = 'sigvet_token';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  #jwtHelperService = inject(JwtHelperService);
  #router = inject(Router);
  #store = inject<Store<AppState>>(Store);

  private setToken(token: TokenResponse) {
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(token));
  }

  public getToken(): TokenResponse | null {
    const savedToken = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!savedToken) return null;
    return JSON.parse(savedToken);
  }

  public async authenticate(user: User) {
    try {
      const response = (await lastValueFrom(this.http.post(this.getEndpointV1('account/token'), user))) as { result: TokenResponse };
      this.setToken(response.result);
      await this.loadingUserInfo();
      this.toastrService.success('Login efetuado.');
      this.#router.navigateByUrl('/dashboard');
    } catch (ex: any) {
      if (!ex.error) return;
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

  private extractUserId(obj: TokenResponse): number | null {
    return this.#jwtHelperService.decodeToken(obj.token)?.user_id ?? null;
  }

  private async getCurrentUser(id: number) {
    return ((await lastValueFrom(this.http.get<UserInfo>(this.getEndpointV1(`account/${id}`)))) as any)?.result;
  }

  public async loadingUserInfo() {
    if (!this.isAuthenticated) return;
    const userId = this.extractUserId(this.getToken()!);
    const userInfo = await this.getCurrentUser(userId!);
    this.#store.dispatch(UserActions.setUserInfo(userInfo));
  }

  public signOut() {
    this.setToken(null!);
    this.#router.navigateByUrl('/login');
    this.toastrService.warning('Saiu')
  }

  get isAuthenticated() {
    return this.getToken() !== null &&
      !this.#jwtHelperService.isTokenExpired(this.getToken()?.token!);
  }

}
