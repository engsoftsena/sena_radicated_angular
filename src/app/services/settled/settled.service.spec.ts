import { TestBed } from '@angular/core/testing';

import { SettledService } from './settled.service';

describe('SettledService', () => {
  let service: SettledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
