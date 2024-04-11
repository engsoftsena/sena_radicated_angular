import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BaseurlService } from './baseurl.service';

describe('BaseurlService', () => {
  let service: BaseurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(BaseurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
