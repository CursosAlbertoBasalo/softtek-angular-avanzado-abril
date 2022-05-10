import { Status } from './status.enum';

export interface ApiStatus {
  current: Status;
  last: Status;
  error: string;
  message: string;
  calls: number;
  errors: number;
}
