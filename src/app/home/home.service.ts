import { Injectable } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Trip } from '@stk/models/trip.interface';
import { AgenciesService } from '@stk/services/agencies.service';
import { TripsService } from '@stk/services/trips.service';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private agencies: AgenciesService, private trips: TripsService) {}
  getAgencies$(): Observable<Agency[]> {
    return this.agencies.getAll$().pipe(delay(1000));
    // return of([]).pipe(delay(1000));
    // return this.agencies.getError$()
  }
  getTrips$(): Observable<Trip[]> {
    return this.trips.getAll$().pipe(delay(500));
    // return of([]).pipe(delay(500));
    // return this.trips.getError$();
  }
}
