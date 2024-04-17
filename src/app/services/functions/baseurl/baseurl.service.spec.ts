import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BaseurlService } from './baseurl.service';

describe('BaseurlService', () => {
  let service: BaseurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(BaseurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
