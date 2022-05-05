import { Injectable } from '@angular/core';
import { WeightAbstractService } from './weight-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class WeightImperialService extends WeightAbstractService {
  constructor() {
    super();
  }

  private readonly poundsPerKilo = 2.204;

  getWeight(weight: number): string {
    return Math.round(weight * this.poundsPerKilo) + ' lbs';
  }
}
