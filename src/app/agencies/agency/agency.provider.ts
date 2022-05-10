import { InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agency } from '@stk/models/agency.interface';
import { AgenciesService } from '@stk/services/agencies.service';
import { map, Observable, switchMap } from 'rxjs';

export const AGENCY$ = new InjectionToken<Observable<Agency>>('agency$');

function createAgency$(
  activateRoute: ActivatedRoute,
  agencies: AgenciesService
): Observable<Agency> {
  return activateRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id') || ''),
    switchMap((id) => agencies.getById$(id))
  );
}

export const AGENCY$_PROVIDER = {
  provide: AGENCY$,
  useFactory: createAgency$,
  deps: [ActivatedRoute, AgenciesService],
};
