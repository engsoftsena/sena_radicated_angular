import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApRequestService } from './ap-request.service';

describe('ApRequestService', () => {
  let service: ApRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
