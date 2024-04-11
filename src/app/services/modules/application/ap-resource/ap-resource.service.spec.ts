import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApResourceService } from './ap-resource.service';

describe('ApResourceService', () => {
  let service: ApResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
