import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../application/facades/auth.facade';

/**
 * Prevents an already-authenticated user from seeing the login page again —
 * the mirror image of authGuard.
 */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);

  if (auth.hasValidSession()) {
    return router.createUrlTree(['/dashboard']);
  }
  return true;
};
