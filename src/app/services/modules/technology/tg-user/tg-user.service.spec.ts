import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TgUserService } from './tg-user.service';

describe('TgUserService', () => {
  let service: TgUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(TgUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
