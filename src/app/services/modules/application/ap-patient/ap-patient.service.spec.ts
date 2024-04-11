import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApPatientService } from './ap-patient.service';

describe('ApPatientService', () => {
  let service: ApPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
