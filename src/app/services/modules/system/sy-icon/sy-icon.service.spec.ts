import { TestBed } from '@angular/core/testing';

import { SyIconService } from './sy-icon.service';

describe('SyIconService', () => {
  let service: SyIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
