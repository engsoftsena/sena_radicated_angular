import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TgRoleService } from './tg-role.service';

describe('TgRoleService', () => {
  let service: TgRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(TgRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
