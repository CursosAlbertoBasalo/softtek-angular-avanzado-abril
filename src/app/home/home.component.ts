import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Trip } from '@stk/models/trip.interface';
import { catchError, map, Observable, of } from 'rxjs';
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

  trips$: Observable<Api<Trip>> = this.service.getTrips$().pipe(
    map((data) => ({ data: data, error: undefined })),
    catchError((error) => of({ data: undefined, error: error.message }))
  );

  constructor(private service: HomeService) {}

  ngOnInit(): void {}

  loadAgencies() {
    this.agencies$ = this.service.getAgencies$();
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$().pipe(
      map((data) => ({ data })),
      catchError((error) => of({ error: error.message }))
    );
  }
}
