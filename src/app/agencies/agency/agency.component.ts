import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Agency } from '@stk/models/agency.interface';
import { Observable } from 'rxjs';
import { AGENCY$, AGENCY$_PROVIDER } from './agency.provider';

@Component({
  selector: 'stk-agency',
  templateUrl: './agency.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AGENCY$_PROVIDER],
})
export class AgencyComponent implements OnInit {
  constructor(@Inject(AGENCY$) public agency$: Observable<Agency>) {}

  ngOnInit(): void {}
}
