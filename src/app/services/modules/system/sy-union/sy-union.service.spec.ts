import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SyUnionService } from './sy-union.service';

describe('SyUnionService', () => {
  let service: SyUnionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SyUnionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
