import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated;

  if (state.url === '/login' && isAuthenticated) {
    router.navigateByUrl('/dashboard');
    return false;
  } else {
    return true;
  }
};
