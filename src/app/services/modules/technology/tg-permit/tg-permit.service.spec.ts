import { TestBed } from '@angular/core/testing';

import { TgPermitService } from './tg-permit.service';

describe('TgPermitService', () => {
  let service: TgPermitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgPermitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
