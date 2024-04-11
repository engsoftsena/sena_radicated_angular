import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApCausalService } from './ap-causal.service';

describe('ApCausalService', () => {
  let service: ApCausalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApCausalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
