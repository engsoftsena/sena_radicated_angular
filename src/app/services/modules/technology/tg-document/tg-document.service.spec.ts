import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TgDocumentService } from './tg-document.service';

describe('TgDocumentService', () => {
  let service: TgDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(TgDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
