import { TestBed } from '@angular/core/testing';

import { SyRelationService } from './sy-relation.service';

describe('SyRelationService', () => {
  let service: SyRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
