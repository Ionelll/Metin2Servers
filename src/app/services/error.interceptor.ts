import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorService: ErrorService,
    private authService: AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400) localStorage.removeItem('token');
        else if (error.error?.error)
          this.errorService.setError('', [error.error.error]);
        else this.errorService.setError('server', Object.keys(error.error));

        return of({ error: true, message: error.error?.message });
      })
    );
  }
}
