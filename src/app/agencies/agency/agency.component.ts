import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Agency } from '@stk/models/agency.interface';
import { Observable, tap } from 'rxjs';
import { AGENCY$, AGENCY$_PROVIDER } from './agency.provider';

@Component({
  selector: 'stk-agency',
  templateUrl: './agency.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AGENCY$_PROVIDER],
})
export class AgencyComponent implements OnInit {
  agency$: Observable<Agency>;
  constructor(@Inject(AGENCY$) agency$: Observable<Agency>, title: Title, meta: Meta) {
    this.agency$ = agency$.pipe(
      tap((agency) => {
        title.setTitle(agency.name);
        meta.updateTag({
          name: 'description',
          content: 'Data of agency' + agency.name + ' - ' + agency.range,
        });
      })
    );
  }

  ngOnInit(): void {}
}
