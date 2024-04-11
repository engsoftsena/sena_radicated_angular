import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EndpointService } from './endpoint.service';

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
