import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmHostingService } from './em-hosting.service';

describe('EmHostingService', () => {
  let service: EmHostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(EmHostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
