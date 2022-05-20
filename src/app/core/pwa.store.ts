import { Injectable } from '@angular/core';
import { AtomicStore } from './atomic.store';
import { LoggerService } from './logger.service';

export type Pwa = { version: string; description: string; status: string; showReload: boolean };

@Injectable({
  providedIn: 'root',
})
export class PwaStore extends AtomicStore<Pwa> {
  constructor(logger: LoggerService) {
    super({ version: 'initial', description: 'initial', status: 'initial', showReload: false });
    super.getChanges$().subscribe((change) => logger.log('🪟 PwaStore', change));
  }
}
