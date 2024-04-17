import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApCausalService } from './ap-causal.service';

describe('ApCausalService', () => {
  let service: ApCausalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApCausalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
