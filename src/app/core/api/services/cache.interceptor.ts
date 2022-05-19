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
import { StateAbstractService } from '../../state_abstract.service';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
  //private readonly cache = new Map<string, unknown>();

  constructor(private abstract: StateAbstractService, private readonly logger: LoggerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'GET') {
      this.logger.warn('💭 ➡️  no cache method : ' + request.method, 0);
      return next.handle(request);
    }
    const urlRequest = request.urlWithParams;
    const cachedResponse = this.getFromCache(urlRequest);
    if (cachedResponse) {
      this.logger.log('📦 🌩️ Returning cached response for ' + urlRequest, cachedResponse.length);
      return of(new HttpResponse({ body: cachedResponse }));
    }
    return next.handle(request).pipe(
      filter((event) => event instanceof HttpResponse),
      tap({
        next: (response) => {
          this.setToCache(urlRequest, (response as HttpResponse<unknown>).body);
        },
      })
    );
  }

  private getFromCache(urlKey: string): any {
    //this.logger.warn('📏 ➡️  Pre cache size : ', this.cache.size);
    let result: any = null; //this.cache.get(urlKey);
    if (result) {
      this.logger.warn('📦 ➡️  Using cache from : ' + urlKey, result.length);
      this.logger.warn('📦 ⤵️ Transferring data from: ' + urlKey, result.length);
      this.abstract.setTransferState(urlKey, result);
    } else {
      this.logger.warn('🕳️  No cache found for : ' + urlKey, 0);
      result = this.abstract.getTransferState(urlKey);
      if (result) {
        this.setToCache(urlKey, result);
      } else {
        this.logger.warn('🕳️  No transferred data for: ' + urlKey, 0);
      }
    }
    return result;
  }

  private setToCache(urlKey: string, response: any) {
    this.logger.warn('➡️ 📦 Caching response for: ' + urlKey, response.length);
    // this.cache.set(urlKey, response);
    this.abstract.setTransferState(urlKey, response);
    // this.logger.warn('📏 ➡️  Post cache size : ', this.cache.size);
  }
}
