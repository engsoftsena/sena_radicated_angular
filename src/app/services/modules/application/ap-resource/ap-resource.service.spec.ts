import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApResourceService } from './ap-resource.service';

describe('ApResourceService', () => {
  let service: ApResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
