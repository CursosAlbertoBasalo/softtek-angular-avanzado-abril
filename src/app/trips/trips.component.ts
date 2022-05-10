import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'stk-trips',
  templateUrl: './trips.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  searchInput$!: Observable<string>;

  constructor() {}

  ngOnInit(): void {
    this.searchInput$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event) => (event as any).target.value),
      debounceTime(500),
      filter((text) => text.length > 2),
      distinctUntilChanged(),
      tap({
        next: (data) => console.log(data),
      })
    );
  }
}
