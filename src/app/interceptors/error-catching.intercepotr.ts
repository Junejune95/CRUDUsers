import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  private config: MatSnackBarConfig<any> = new MatSnackBarConfig();

  constructor(readonly snackBar: MatSnackBar) {
    this.config.panelClass = ['snackbar-container'];
    this.config.verticalPosition = 'top';
    this.config.horizontalPosition = 'right';
    this.config.duration = 4000;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 400: {
              errorMsg = `Error Code: ${error.status},  Message: ${error.error.data.email}`;
              this.snackBar.open(errorMsg, '', this.config);
              break;
            }

            default: {
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              this.snackBar.open(errorMsg, '', this.config);
              break;
            }
          }
        }
        console.log(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}