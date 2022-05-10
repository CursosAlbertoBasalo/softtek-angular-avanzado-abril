import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, mergeMap, Observable, of, retryWhen, throwError } from 'rxjs';
import { LoggerService } from '../../logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly retryIncrementalDelay = 1000;
  private readonly retryMaxAttempts = 2;
  private readonly retryErrorFromCode = 404;

  constructor(private readonly logger: LoggerService, private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((errors: Observable<any>) => this.processCallErrors(errors)),
      catchError((err) => this.processError(err))
    );
  }

  private processCallErrors(errors: Observable<any>): Observable<any> {
    return errors.pipe(mergeMap((error, count) => this.processCallError(error, count)));
  }

  private processCallError(error: any, count: number): Observable<any> {
    if (this.isRetriableCall(error, count)) {
      const retries = count + 1;
      this.logger.warn(`♻️ Retry #${retries} for error: ${error.message}`, error);
      return of(error).pipe(delay(this.retryIncrementalDelay));
    }
    return throwError(() => error);
  }

  private isRetriableCall(error: any, count: number) {
    return (
      error instanceof HttpErrorResponse &&
      error.status >= this.retryErrorFromCode &&
      count < this.retryMaxAttempts
    );
  }

  private processError(error: any): Observable<any> {
    const httpError = error as HttpErrorResponse;
    if (!httpError) {
      this.logger.error('💣 Application error', error);
    }
    if ([401, 403].includes(httpError.status)) {
      this.logger.warn('👮‍♂️ Security error. Redirecting to login page', error);
      this.router.navigate(['/login']);
    } else {
      if (httpError.status === 0 || httpError.status >= 500) {
        this.logger.error('😵‍💫 Server error', error);
      } else {
        this.logger.error('🙅‍♂️ Http Invalid Call', error);
      }
    }
    return throwError(() => error);
  }
}
