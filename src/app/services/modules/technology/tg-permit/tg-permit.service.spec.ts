import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TgPermitService } from './tg-permit.service';

describe('TgPermitService', () => {
  let service: TgPermitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TgPermitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
