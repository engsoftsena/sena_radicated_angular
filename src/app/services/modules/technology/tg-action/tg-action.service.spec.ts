import { TestBed } from '@angular/core/testing';

import { TgActionService } from './tg-action.service';

describe('TgActionService', () => {
  let service: TgActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TgActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
