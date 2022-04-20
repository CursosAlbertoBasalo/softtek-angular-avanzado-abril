import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

type Api = {
  data?: unknown[];
  error?: string;
};

@Component({
  selector: 'stk-async-wrapper',
  templateUrl: './async-wrapper.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncWrapperComponent implements OnInit {
  @Input() dataName = '';
  @Output() refresh = new EventEmitter<void>();

  api$: Observable<Api> = of({});
  @Input() set apiCall$(value$: Observable<unknown[]>) {
    this.api$ = value$.pipe(
      map((data) => ({ data })),
      catchError((error) => of({ error: error.message }))
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
