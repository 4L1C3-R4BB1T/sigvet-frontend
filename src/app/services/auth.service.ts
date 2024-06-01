import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';
import BaseService from '../base/base.service';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';
import { AppState } from '../store';
import { UserActions } from '../store/reducers/user.reducer';

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
  userInfo = signal<User | null>(null);

  private setToken(token: TokenResponse) {
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(token));
  }

  public getToken(): TokenResponse | null {
    const savedToken = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!savedToken) return null;
    return JSON.parse(savedToken);
  }

  public async authenticate(user: UserLogin) {
    try {
      const response = (await lastValueFrom(this.http.post(this.getEndpointV1('account/token'), user))) as { result: TokenResponse };
      this.setToken(response.result);
      await this.loadingUserInfo();
      this.toastrService.success('Login efetuado.');
      this.#router.navigateByUrl('/dashboard', { skipLocationChange: true });
    } catch (ex: any) {
      this.handleException(ex);
    }
  }

  private extractUserId(obj: TokenResponse): number | null {
    return this.#jwtHelperService.decodeToken(obj.token)?.user_id ?? null;
  }

  public getUserId() {
    return this.extractUserId(this.getToken()!);
  }

  public getRoles() {
    if (!this.getToken()) return [];
    const { token } = this.getToken()!;
    return (this.#jwtHelperService.decodeToken(token)?.scope as string)?.split(' ') ?? [];
  }

  public hasRole(role: string) {
    return this.getRoles().includes(role);
  }

  public hasSingleRole(role: string) {
    return this.getRoles().length === 1 && this.getRoles().includes(role);
  }

  private async getCurrentUser(id: number) {
      return ((await lastValueFrom(this.http.get<User>(this.getEndpointV1(`account/${id}`)))) as any)?.result;
  }

  public async loadingUserInfo() {
    try {
      const userId = this.extractUserId(this.getToken()!);
      const userInfo = await this.getCurrentUser(userId!);
      setTimeout(() => this.#store.dispatch(UserActions.setUserInfo(userInfo)), 200);
    } catch (ex: any) {
      this.setToken(null!);
      this.#router.navigateByUrl('/login');
    }
  }

  public signOut() {
    this.setToken(null!);
    this.#router.navigateByUrl('/login');
    this.toastrService.warning('Deslogado')
  }

  get isAuthenticated() {
    return this.getToken() !== null &&
      !this.#jwtHelperService.isTokenExpired(this.getToken()?.token!);
  }

}
