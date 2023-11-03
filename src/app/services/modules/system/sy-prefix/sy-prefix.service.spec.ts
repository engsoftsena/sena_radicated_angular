import { TestBed } from '@angular/core/testing';

import { SyPrefixService } from './sy-prefix.service';

describe('SyPrefixService', () => {
  let service: SyPrefixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyPrefixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
