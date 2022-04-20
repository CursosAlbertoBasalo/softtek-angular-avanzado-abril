import { Pipe, PipeTransform } from '@angular/core';
import { AgencyRange } from '@stk/models/agency-range.enum';

@Pipe({
  name: 'agencyRange',
})
export class AgencyRangePipe implements PipeTransform {
  transform(value: AgencyRange, ...args: unknown[]): unknown {
    switch (value) {
      case AgencyRange.Orbital:
        return '💫';
      default:
        return '🌠';
    }
  }
}
