import { TestBed } from '@angular/core/testing';

import { SyEliminateService } from './sy-eliminate.service';

describe('SyEliminateService', () => {
  let service: SyEliminateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyEliminateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
