import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TgActionService } from './tg-action.service';

describe('TgActionService', () => {
  let service: TgActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(TgActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
