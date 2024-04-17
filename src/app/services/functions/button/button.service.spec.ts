import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ButtonService } from '../button/button.service';

describe('ButtonService', () => {
  let service: ButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
