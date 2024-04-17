import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { EndpointService } from '../endpoint/endpoint.service';
import { empty, of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let mockServiceEndpoint: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  // Function authToken
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



  // Function resolveHtmlSelect
  it('should resolve promise with data when proccessHtmlSelect succeeds', async () => {
    // Arrange
    const params = { /* params here */ };
    spyOn(service, 'proccessHtmlSelect').and.returnValue(of('data'));

    // Act
    const promise = service.resolveHtmlSelect(params);

    // Assert
    await expectAsync(promise).toBeResolvedTo('data');
  });

  it('should reject promise when proccessHtmlSelect fails', async () => {
    // Arrange
    const params = { /* params here */ };
    const error = 'error message';
    spyOn(service, 'proccessHtmlSelect').and.returnValue(throwError(error));

    // Act
    const promise = service.resolveHtmlSelect(params);

    // Assert
    await expectAsync(promise).toBeRejectedWith(error);
  });

  it('should resolve promise with null when proccessHtmlSelect completes without emitting', async () => {
    // Arrange
    const params = { /* params here */ };
    spyOn(service, 'proccessHtmlSelect').and.returnValue(empty());

    // Act
    const promise = service.resolveHtmlSelect(params);

    // Assert
    await expectAsync(promise).toBeResolvedTo(null);
  });
});
