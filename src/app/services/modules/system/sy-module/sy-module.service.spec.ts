import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SyModuleService } from './sy-module.service';

describe('SyModuleService', () => {
  let service: SyModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SyModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
