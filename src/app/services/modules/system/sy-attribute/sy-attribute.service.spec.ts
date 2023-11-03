import { TestBed } from '@angular/core/testing';

import { SyAttributeService } from './sy-attribute.service';

describe('SyAttributeService', () => {
  let service: SyAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
