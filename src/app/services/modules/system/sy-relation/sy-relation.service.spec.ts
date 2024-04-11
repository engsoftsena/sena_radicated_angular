import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SyRelationService } from './sy-relation.service';

describe('SyRelationService', () => {
  let service: SyRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SyRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
