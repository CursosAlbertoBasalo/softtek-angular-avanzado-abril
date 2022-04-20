import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';

@Component({
  selector: 'stk-agencies',
  templateUrl: './agencies.list.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesList implements OnInit {
  @Input() agencies: Agency[] = [];
  constructor() {}

  ngOnInit(): void {}
}
