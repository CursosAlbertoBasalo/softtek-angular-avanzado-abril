import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Agency } from '@stk/models/agency.interface';
import { AgenciesService } from '@stk/services/agencies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenciesResolver implements Resolve<Agency[]> {
  constructor(private readonly agencies: AgenciesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agency[]> {
    // return of([
    //   {
    //     id: 'AstroSofttek',
    //     name: 'Astro Softtek',
    //     range: AgencyRange.Orbital,
    //     status: AgencyStatus.Active,
    //   },
    // ]).pipe(delay(3000));
    return this.agencies.getAll$();
    // return this.agencies.getError$();
  }
}
