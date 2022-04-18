import { AgencyRange } from './agency-range.enum';
import { AgencyStatus } from './agency-status.enum';

export interface Agency {
  id: string;
  name: string;
  range: AgencyRange;
  status: AgencyStatus;
}
