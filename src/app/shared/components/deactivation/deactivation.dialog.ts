import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'stk-deactivation',
  templateUrl: './deactivation.dialog.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeactivationDialog implements OnInit {
  @Output() canBeDeActivated = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
