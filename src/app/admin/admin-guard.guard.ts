import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { User, UserControllerService } from '../api';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const userController = inject(UserControllerService);
  const router = inject(Router);

  return userController.getLoggedUser().pipe(
    map((user: User) => {
      console.log(user);
      if (user.roles?.some((role) => role.name != 'ADMIN')) {
        router.navigate(['/shop']); // Ha nem admin, akkor a shop oldalra irányítjuk
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['/shop']); // Ha hiba van (pl. nincs bejelentkezve), akkor is shop
      return of(false);
    })
  );
};
