import { InjectionToken } from '@angular/core';

export const APP_VERSION = new InjectionToken<string>('appVersion');
export const ONLY_ERRORS = new InjectionToken<boolean>('onlyErrors');
