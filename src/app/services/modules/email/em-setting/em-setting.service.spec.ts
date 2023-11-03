import { TestBed } from '@angular/core/testing';

import { EmSettingService } from './em-setting.service';

describe('EmSettingService', () => {
  let service: EmSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
