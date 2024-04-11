import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TgAuthorizationService } from './tg-authorization.service';

describe('TgAuthorizationService', () => {
  let service: TgAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TgAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
