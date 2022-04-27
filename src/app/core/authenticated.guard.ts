import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanLoad {
  constructor(private readonly router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    // ! const returnUrl = this.router.getCurrentNavigation()?.extractedUrl.toString();
    // return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: returnUrl } });
  }
}
