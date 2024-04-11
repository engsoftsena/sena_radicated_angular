import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SyPrefixService } from './sy-prefix.service';

describe('SyPrefixService', () => {
  let service: SyPrefixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SyPrefixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
