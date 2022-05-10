import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Api } from '@stk/models/api.type';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'stk-async-wrapper',
  templateUrl: './async-wrapper.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncWrapperComponent implements OnInit {
  @Input() dataName = '';
  @Output() refresh = new EventEmitter<void>();

  api$: Observable<Api<unknown>> = of({});
  @Input() set apiCall$(value$: Observable<unknown[]>) {
    this.api$ = value$.pipe(
      map((data) => ({ data, ok: true })),

      catchError((error) => of({ error: error.message, ok: false }))
    );
  }

  @Input() dataTemplate!: TemplateRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}
}
