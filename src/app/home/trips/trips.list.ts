import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';

@Component({
  selector: 'stk-trips',
  templateUrl: './trips.list.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsList implements OnInit {
  @Input() trips: Trip[] = [];

  constructor() {}

  ngOnInit(): void {}
}
