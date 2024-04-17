import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SyIconService } from './sy-icon.service';

describe('SyIconService', () => {
  let service: SyIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(SyIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
