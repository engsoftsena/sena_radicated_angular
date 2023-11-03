import { TestBed } from '@angular/core/testing';

import { SyModuleService } from './sy-module.service';

describe('SyModuleService', () => {
  let service: SyModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
