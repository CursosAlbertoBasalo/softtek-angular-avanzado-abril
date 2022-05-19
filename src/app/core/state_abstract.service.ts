import { Injectable } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export abstract class StateAbstractService {
  constructor(protected transferState: TransferState, protected readonly logger: LoggerService) {}
  public abstract doThings(): void;
  public abstract setTransferState(urlKey: string, response: unknown): void;
  public abstract getTransferState(urlKey: string): unknown;
}
