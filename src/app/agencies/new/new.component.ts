import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'stk-new',
  templateUrl: './new.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent implements OnInit {
  canDeactivate = false;

  constructor() {}

  ngOnInit(): void {}
}
