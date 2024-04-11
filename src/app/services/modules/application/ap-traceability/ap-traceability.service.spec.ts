import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApTraceabilityService } from './ap-traceability.service';

describe('ApTraceabilityService', () => {
  let service: ApTraceabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApTraceabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
