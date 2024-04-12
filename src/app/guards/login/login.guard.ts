import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  private navigate(url: string): void {
    this.router.navigate([url]);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tgUserData = sessionStorage.getItem('tgUserData');
    if (tgUserData == null || tgUserData == '') {
      this.navigate('external/login');
      return false;
    }
    return true;
  }

}
