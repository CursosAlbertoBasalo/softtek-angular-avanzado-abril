import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { APP_VERSION, ONLY_ERRORS } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // private readonly appVersion = '1.0.0';
  // private readonly onlyErrors = true;

  constructor(
    @Inject(APP_VERSION) private readonly appVersion: string,
    @Inject(ONLY_ERRORS) private readonly onlyErrors: boolean,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  isServer(): boolean {
    return isPlatformServer(this.platformId);
  }

  log(message: string, payload: unknown) {
    if (this.isServer()) return;
    if (this.onlyErrors) return;
    const logMessage = `ℹ️ ${this.appVersion} - ${message}`;
    console.log(logMessage, payload);
  }
  warn(message: string, payload: unknown) {
    if (this.isServer()) return;
    if (this.onlyErrors) return;
    const logMessage = `🚧 ${this.appVersion} - ${message}`;
    console.warn(logMessage, payload);
  }
  error(message: string, error: Error) {
    if (this.isServer()) return;
    const logMessage = `💣 ${this.appVersion} - ${message} - ERR: ${error.message}`;
    console.warn(logMessage);
  }
}
