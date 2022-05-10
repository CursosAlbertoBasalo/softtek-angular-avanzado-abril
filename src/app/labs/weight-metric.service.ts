import { Injectable } from '@angular/core';
import { WeightAbstractService } from './weight-abstract.service';

@Injectable()
export class WeightMetricService extends WeightAbstractService {
  constructor() {
    super();
  }
  getWeight(weight: number): string {
    return `${weight} kg`;
  }
}
