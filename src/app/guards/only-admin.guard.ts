import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const onlyAdminGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.hasRole('ADMIN')) {
    return true;
  }

  if (authService.hasSingleRole('UNKNOWN')) {
    router.navigateByUrl('/dashboard/bloqueado');
    return false;
  }

  if (authService.hasRole('CLIENT')) {
    router.navigateByUrl('/dashboard/animais?clientId='+authService.getUserId());
    return false;
  }

  if (authService.hasRole('VET')) {
    router.navigateByUrl('/dashboard/bloqueado');
    return false;
  }

  return false;
};
