import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private readonly cache = new Map<string, HttpEvent<unknown>>();

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') return next.handle(request);

    const urlRequested = request.urlWithParams;
    const cachedResponse = this.cache.get(urlRequested);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      tap((response) => this.cache.set(urlRequested, response))
    );
  }
}
