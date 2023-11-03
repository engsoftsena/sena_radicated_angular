import { TestBed } from '@angular/core/testing';

import { EmHostingService } from './em-hosting.service';

describe('EmHostingService', () => {
  let service: EmHostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmHostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
