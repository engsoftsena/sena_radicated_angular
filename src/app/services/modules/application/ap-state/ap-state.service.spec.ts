import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApStateService } from './ap-state.service';

describe('ApStateService', () => {
  let service: ApStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
