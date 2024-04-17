import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SySelectService } from './sy-select.service';

describe('SySelectService', () => {
  let service: SySelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(SySelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
