import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import BaseService from '../base/base.service';

const STORAGE_AUTH_KEY = 'sigvet_token';

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private setToken(token: TokenResponse) {
    localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(token));
  }

  public getToken(): TokenResponse | null {
    const savedToken = localStorage.getItem(STORAGE_AUTH_KEY);
    if (!savedToken) {
      return null;
    }
    return JSON.parse(savedToken);
  }

  public async authenticate(user: User) {
    try {
      const response = (await lastValueFrom(this.http.post(this.getEndpointV1('account/token'), user))) as { result: TokenResponse };
      this.setToken(response.result);
    } catch (error) {
      console.log(error);
    }
  }

  public isAuthenticated() {
    return this.getToken() !== null;
  }

}
