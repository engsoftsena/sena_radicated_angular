import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApRequestService } from './ap-request.service';

describe('ApRequestService', () => {
  let service: ApRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
