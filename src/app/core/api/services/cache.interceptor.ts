import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, of, tap } from 'rxjs';
import { LoggerService } from '../../logger.service';
import { StateAbstractService } from './state_abstract.service';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
  private readonly cache = new Map<string, unknown>();
  private urlRequest = '';
  constructor(private abstract: StateAbstractService, private readonly logger: LoggerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      this.logger.warn('💭 ➡️  No method to cache: ' + request.method, 0);
      return next.handle(request);
    }
    this.urlRequest = request.urlWithParams;
    const localBody = this.getLocalBody(this.urlRequest);
    if (localBody) {
      this.logger.log('📦 🌩️ Return local response for ' + this.urlRequest, localBody.length);
      const response = new HttpResponse({ body: localBody });
      return of(response);
    }
    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      tap({
        next: this.saveResponse.bind(this),
      })
    );
  }

  private getLocalBody(urlKey: string): any {
    const cached: any = this.cache.get(urlKey);
    if (cached) {
      this.logger.warn('📦 ➡️  Using cache from : ' + urlKey, cached.length);
      this.logger.warn('📦 ⤵️ Transferring data from: ' + urlKey, cached.length);
      this.abstract.setTransferState(urlKey, cached);
      return cached;
    }
    this.logger.warn('🕳️  No cache found for : ' + urlKey, 0);
    const transferred = this.abstract.getTransferState(urlKey);
    if (transferred) {
      this.setToCache(urlKey, transferred);
      return transferred;
    }
    this.logger.warn('🕳️  No transferred data for: ' + urlKey, 0);
  }

  private setToCache(urlKey: string, response: any) {
    this.logger.warn('➡️ 📦 Caching response for: ' + urlKey, response.length);
    this.cache.set(urlKey, response);
    this.abstract.setTransferState(urlKey, response);
  }

  private saveResponse(response: HttpEvent<unknown>) {
    const body = (response as HttpResponse<unknown>).body;
    this.setToCache(this.urlRequest, body);
  }
}
