import { HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthFacade } from '../application/facades/auth.facade';
import { ACCESS_TOKEN_KEY } from '../application/usecases/auth/login.usecase';

const addBearer = (req: HttpRequest<unknown>, token: string) =>
  req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthFacade);

  const publicAuthRoutes = ['/v1/auth/login', '/v1/auth/refresh', '/v1/auth/logout'];
  if (publicAuthRoutes.some(route => req.url.includes(route))) return next(req);

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const outReq = token ? addBearer(req, token) : req;

  return next(outReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) return throwError(() => error);

      const universityId = localStorage.getItem('omu_university_id') ?? '';

      return auth.refresh(universityId).pipe(
        catchError(refreshError => {
          auth.logout().subscribe();
          return throwError(() => refreshError);
        }),
        switchMap(newToken =>
          next(addBearer(req, newToken)).pipe(
            catchError(retryError => {
              return throwError(() => retryError);
            }),
          ),
        ),
      );
    }),
  );
};
