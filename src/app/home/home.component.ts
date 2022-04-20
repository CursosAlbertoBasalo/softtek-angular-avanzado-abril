import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Trip } from '@stk/models/trip.interface';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

type Api<T> = {
  data?: T[];
  error?: string;
};

@Component({
  selector: 'stk-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  agencies$: Observable<Agency[]> = this.service.getAgencies$();
  trips$: Observable<Trip[]> = this.service.getTrips$();

  constructor(private service: HomeService) {}

  ngOnInit(): void {}

  loadAgencies() {
    this.agencies$ = this.service.getAgencies$();
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$();
  }
}
