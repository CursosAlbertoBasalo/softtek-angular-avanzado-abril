import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CacheInterceptor } from '@stk/services/cache.interceptor';
import { ErrorInterceptor } from '@stk/services/error.interceptor';
import { StatusInterceptor } from '@stk/services/status.interceptor';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoAuxComponent } from './components/info-aux/info-aux.component';
import { LoggerService } from './logger.service';
import { APP_VERSION, ONLY_ERRORS } from './tokens';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, InfoAuxComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, InfoAuxComponent],
  providers: [
    { provide: APP_VERSION, useValue: '1.0.0' },
    { provide: ONLY_ERRORS, useValue: environment.onlyErrors },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: StatusInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(logger: LoggerService) {
    logger.log('CoreModule created', {});
    logger.warn('CoreModule created', { warning: true });
    logger.error('CoreModule ERROR', new Error('Fake Error'));
  }
}
