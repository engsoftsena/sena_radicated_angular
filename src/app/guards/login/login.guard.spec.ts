import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to external/login if tgUserData is null', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['external/login']);
  });

  it('should navigate to external/login if tgUserData is empty', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(sessionStorage, 'getItem').and.returnValue('');

    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['external/login']);
  });

  it('should return true if tgUserData is not null or empty', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('someValue');

    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });
});
