import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, of } from 'rxjs';

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
  @Input() api$: Observable<Api> = of({});
  @Input() dataName = '';
  @Output() refresh = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
