import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CacheInterceptor } from '@stk/services/cache.interceptor';
import { ErrorInterceptor } from '@stk/services/error.interceptor';
import { StateBrowserService } from '@stk/services/state_browser.service';
import { StateServerService } from '@stk/services/state_server.service';
import { StatusInterceptor } from '@stk/services/status.interceptor';
import { environment } from 'src/environments/environment';
import { StateAbstractService } from './api/services/state_abstract.service';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoAuxComponent } from './components/info-aux/info-aux.component';
import { LoggerService } from './logger.service';
import { APP_VERSION, ONLY_ERRORS } from './tokens';

function createStateService(
  platformId: Object,
  transferState: TransferState,
  loggerService: LoggerService
) {
  return isPlatformBrowser(platformId)
    ? new StateBrowserService(transferState, loggerService)
    : new StateServerService(transferState, loggerService);
}

@NgModule({
  declarations: [HeaderComponent, FooterComponent, InfoAuxComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, InfoAuxComponent],
  providers: [
    { provide: APP_VERSION, useValue: '1.1.0' },
    { provide: ONLY_ERRORS, useValue: environment.onlyErrors },
    {
      provide: StateAbstractService,
      useFactory: createStateService,
      deps: [PLATFORM_ID, TransferState, LoggerService],
    },
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
