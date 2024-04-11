import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SySelectService } from './sy-select.service';

describe('SySelectService', () => {
  let service: SySelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SySelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
