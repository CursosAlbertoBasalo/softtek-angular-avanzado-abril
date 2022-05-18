import { Injectable } from '@angular/core';
import { Status } from '@stk/models/status.enum';
import { AtomicStore } from '../../atomic.store';

export type HttpStatus = { status: Status; urlRequest: string };

@Injectable({
  providedIn: 'root',
})
export class ApiStatusStoreService extends AtomicStore<HttpStatus> {
  constructor() {
    super({ status: Status.Idle, urlRequest: '' });
    super.getChanges$().subscribe((change) => console.table(change));
  }
}
