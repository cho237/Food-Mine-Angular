import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user.token}`,
        });
        const modifiedReq = req.clone({ headers });
        return next.handle(modifiedReq);
      })
    );
  }
}
