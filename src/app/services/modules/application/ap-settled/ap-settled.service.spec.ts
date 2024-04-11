import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApSettledService } from './ap-settled.service';

describe('ApSettledService', () => {
  let service: ApSettledService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApSettledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
