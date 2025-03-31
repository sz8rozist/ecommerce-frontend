import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({ withCredentials: true, responseType: 'json' });

  return next(modifiedReq)
};
