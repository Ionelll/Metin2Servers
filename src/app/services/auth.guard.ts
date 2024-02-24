import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
export const AuthGuard = async () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const isLoggedIn = authService.returnLoggedin();
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
