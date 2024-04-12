import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return headers with Authorization token when serviceToken is not null', () => {
    // Arrange
    service.serviceToken = 'example-token';

    // Act
    const headers = service.authToken();

    // Assert
    expect(headers).toEqual(jasmine.any(HttpHeaders));
    expect(headers?.get('Content-Type')).toBe('application/json');
    expect(headers?.get('Authorization')).toBe('Bearer example-token');
  });

  it('should return null when serviceToken is null', () => {
    // Arrange
    service.serviceToken = null;

    // Act
    const headers = service.authToken();

    // Assert
    expect(headers).toBeNull();
  });
});
