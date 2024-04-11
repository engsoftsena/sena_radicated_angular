import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ExternalService } from './external.service';

describe('ExternalService', () => {
  let service: ExternalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ExternalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
