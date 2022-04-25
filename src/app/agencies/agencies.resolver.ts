import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Agency } from '@stk/models/agency.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenciesResolver implements Resolve<Agency[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agency[]> {
    return of([]);
  }
}
