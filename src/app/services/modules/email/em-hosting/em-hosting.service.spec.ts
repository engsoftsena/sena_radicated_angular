import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EmHostingService } from './em-hosting.service';

describe('EmHostingService', () => {
  let service: EmHostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EmHostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
