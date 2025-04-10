import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from './auth/auth-service.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);  // Az injektálás itt történik
  const authHeaders = authService.getAuthHeaders();
  
  if (authHeaders.Authorization) {
    // Hozzáadjuk a Bearer tokent a kéréshez
    const clonedRequest = req.clone({
      setHeaders: authHeaders
    });
    return next(clonedRequest);
  }
  return next(req);
};

