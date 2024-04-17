import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SyPrefixService } from './sy-prefix.service';

describe('SyPrefixService', () => {
  let service: SyPrefixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(SyPrefixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
