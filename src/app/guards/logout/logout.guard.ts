import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  private navigate(url: string): void {
    this.router.navigate([url]);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const tgUser = sessionStorage.getItem('tgUser');
    if (tgUser != null && tgUser != '') {
      this.navigate('internal/dashboard');
      return false;
    } else {
      this.navigate('full');
    }
    return true;
  }

}
