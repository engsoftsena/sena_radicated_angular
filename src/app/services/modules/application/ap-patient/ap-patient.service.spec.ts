import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApPatientService } from './ap-patient.service';

describe('ApPatientService', () => {
  let service: ApPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
