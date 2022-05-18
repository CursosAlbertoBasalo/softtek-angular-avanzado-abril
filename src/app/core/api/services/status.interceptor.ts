import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '@stk/models/status.enum';
import { filter, Observable, tap } from 'rxjs';
import { LoggerService } from '../../logger.service';
import { ApiStatusStoreService } from './api-status-store.service';

@Injectable()
export class StatusInterceptor implements HttpInterceptor {
  constructor(
    private readonly logger: LoggerService,
    private readonly store: ApiStatusStoreService
  ) {}

  setStatus(status: Status, urlRequest?: string, error?: string) {
    this.logger.log('📇 TO DO: Use a global service to communicate status:', {
      status: status,
      message: urlRequest,
      error: error,
    });
    this.store.set({
      status: status,
      urlRequest: urlRequest,
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.setStatus(Status.Working, request.urlWithParams);

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      // tap(
      //   (event) => this.setStatus(Status.Success, request.urlWithParams, ''),
      //   (error) => this.setStatus(Status.Error, request.urlWithParams, error.message)
      // ),
      tap({
        next: (event) => this.setStatus(Status.Success, request.urlWithParams, ''),
        error: (error) => this.setStatus(Status.Error, request.urlWithParams, error.message),
      })
    );
  }
}
