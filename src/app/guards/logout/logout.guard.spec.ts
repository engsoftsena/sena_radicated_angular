import { TestBed } from '@angular/core/testing';

import { LogoutGuard } from './logout.guard';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('LogoutGuard', () => {
  let guard: LogoutGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogoutGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to internal/dashboard if tgUser is not null or empty', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(sessionStorage, 'getItem').and.returnValue('someValue');

    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['internal/dashboard']);
  });

  it('should navigate to full if tgUser is null or empty', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['full']);
  });
});
