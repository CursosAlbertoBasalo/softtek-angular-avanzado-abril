import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'stk-new',
  templateUrl: './new.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent implements OnInit {
  isDirty = false;
  isAskingForDeActivation$ = new Subject<boolean>();
  canDeDeactivated$ = new Subject<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onCanBeDeActivated(canBeDeactivated: boolean) {
    this.isAskingForDeActivation$.next(false);
    this.canDeDeactivated$.next(canBeDeactivated);
  }

  canDeactivate(): Observable<boolean> {
    if (this.isDirty) {
      this.isAskingForDeActivation$.next(true);
      return this.canDeDeactivated$.asObservable();
    } else {
      return of(true);
    }
  }
}
