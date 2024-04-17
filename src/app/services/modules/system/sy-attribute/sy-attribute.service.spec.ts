import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SyAttributeService } from './sy-attribute.service';

describe('SyAttributeService', () => {
  let service: SyAttributeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(SyAttributeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
