import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const email = authService.getAdminEmail();
  if (!email || !authService.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }

  try {
    const isAdmin = await firstValueFrom(authService.checkIfAdmin(email));
    authService.setAdminStatus(isAdmin);

    if (isAdmin) return true;

    // If not admin, redirect to account, which is not guarded by adminGuard
    return router.createUrlTree(['/account']);
  } catch (err) {
    return router.createUrlTree(['/account']);
  }
};
