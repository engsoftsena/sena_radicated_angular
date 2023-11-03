import { TestBed } from '@angular/core/testing';

import { SySelectService } from './sy-select.service';

describe('SySelectService', () => {
  let service: SySelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SySelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
