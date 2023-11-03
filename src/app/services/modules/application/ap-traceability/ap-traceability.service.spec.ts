import { TestBed } from '@angular/core/testing';

import { TraceabilityService } from './ap-traceability.service';

describe('TraceabilityService', () => {
  let service: TraceabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
