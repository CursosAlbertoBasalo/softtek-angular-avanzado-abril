import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
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
  agencies$: Observable<Api<Agency>> = this.service.getAgencies$().pipe(
    map((data) => ({ data: data, error: undefined })),
    catchError((error) => of({ data: undefined, error: error.message }))
  );
  //   .subscribe({
  //   next: (data) => console.log(data),
  //   error: (err) => console.log(err),
  //   complete: () => console.log(),
  // });
  trips$ = this.service.getTrips$();

  constructor(private service: HomeService) {}

  ngOnInit(): void {}

  loadAgencies() {
    // this.agencies$ = this.service.getAgencies$();
  }
  loadTrips() {
    this.trips$ = this.service.getTrips$();
  }
}
