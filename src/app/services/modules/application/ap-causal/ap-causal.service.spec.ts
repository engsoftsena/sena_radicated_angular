import { TestBed } from '@angular/core/testing';

import { CausalService } from './ap-causal.service';

describe('CausalService', () => {
  let service: CausalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CausalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
