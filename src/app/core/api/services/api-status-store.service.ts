import { Injectable } from '@angular/core';
import { Status } from '@stk/models/status.enum';
import { AtomicStore } from '../../atomic.store';
import { LoggerService } from '../../logger.service';

export type HttpStatus = { status: Status; urlRequest: string };

@Injectable({
  providedIn: 'root',
})
export class ApiStatusStoreService extends AtomicStore<HttpStatus> {
  constructor(logger: LoggerService) {
    super({ status: Status.Idle, urlRequest: '' });
    super.getChanges$().subscribe((change) => logger.log('🛂 ApiStatusStoreService', change));
  }
}
