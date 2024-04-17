import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApCommunicationService } from './ap-communication.service';

describe('ApCommunicationService', () => {
  let service: ApCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
