import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'stk-new',
  templateUrl: './new.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent implements OnInit {
  isDirty = true;
  canDeactivate$ = new Subject<boolean>();

  constructor() {}

  ngOnInit(): void {}

  canDeactivate(): Observable<boolean> {
    return this.canDeactivate$.asObservable();
    // return of(true);
  }
}
