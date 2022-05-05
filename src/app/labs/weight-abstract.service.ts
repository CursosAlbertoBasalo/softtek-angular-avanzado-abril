import { Injectable } from '@angular/core';

@Injectable()
export abstract class WeightAbstractService {
  constructor() {}
  abstract getWeight(weight: number): string;
}
