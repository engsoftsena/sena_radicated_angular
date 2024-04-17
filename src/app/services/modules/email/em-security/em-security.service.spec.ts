import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmSecurityService } from './em-security.service';

describe('EmSecurityService', () => {
  let service: EmSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(EmSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
