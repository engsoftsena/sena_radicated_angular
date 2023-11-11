import { TestBed } from '@angular/core/testing';

import { SyUnionService } from './sy-union.service';

describe('SyUnionService', () => {
  let service: SyUnionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyUnionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
