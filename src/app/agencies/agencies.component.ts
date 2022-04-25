import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';

@Component({
  selector: 'stk-agencies',
  templateUrl: './agencies.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesComponent implements OnInit {
  agencies: { data: Agency[] } = { data: [] };

  constructor() {}

  ngOnInit(): void {}
}
