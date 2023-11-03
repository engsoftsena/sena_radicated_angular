import { TestBed } from '@angular/core/testing';

import { TgAuthorizationService } from './tg-authorization.service';

describe('TgAuthorizationService', () => {
  let service: TgAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
