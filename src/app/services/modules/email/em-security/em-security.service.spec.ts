import { TestBed } from '@angular/core/testing';

import { EmSecurityService } from './em-security.service';

describe('EmSecurityService', () => {
  let service: EmSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
