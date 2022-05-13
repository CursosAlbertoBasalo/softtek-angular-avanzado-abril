import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Trip } from '@stk/models/trip.interface';
import { TripsService } from '@stk/services/trips.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  pipe,
  shareReplay,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'stk-trips',
  templateUrl: './trips.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  searchInput$!: Observable<string>;
  trips$!: Observable<Trip[]>;

  constructor(private readonly trips: TripsService) {}

  ngOnInit(): void {
    const filtrar = (text: string) => text.length > 1;

    const misOperadores = pipe(
      debounceTime(500),
      map((event) => (event as any).target.value as string),
      filter(filtrar),
      distinctUntilChanged()
    );
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(misOperadores);

    this.searchInput$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // tap({
      //   next: (data) => console.log('PRE:' + (event as any).target.value),
      // }),
      debounceTime(500),
      map((event) => (event as any).target.value as string),
      filter(filtrar),
      distinctUntilChanged()
      // tap({
      //   next: (data) => console.log(data),
      // })
    );

    this.trips$ = this.searchInput$.pipe(
      // map((searchText) => {
      //   return this.trips.getByText$(searchText);
      // }),
      switchMap((searchText) => {
        return this.trips.getByText$(searchText);
      }),
      // concatMap((searchText) => {
      //   return this.trips.getByText$(searchText);
      // }),
      // exhaustMap((searchText) => {
      //   return this.trips.getByText$(searchText);
      // })
      shareReplay()
    );
  }
}
