import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EmSettingService } from './em-setting.service';

describe('EmSettingService', () => {
  let service: EmSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EmSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
