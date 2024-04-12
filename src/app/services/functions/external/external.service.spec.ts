import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExternalService } from './external.service';
import { EndpointService } from '../endpoint/endpoint.service';

describe('ExternalService', () => {
  let service: ExternalService;
  let httpMock: HttpTestingController;
  let serviceEndpoint: EndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ExternalService, EndpointService]
    });
    service = TestBed.inject(ExternalService);
    httpMock = TestBed.inject(HttpTestingController);
    serviceEndpoint = TestBed.inject(EndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error in POST request', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    const params = {
      table: 'tg_user',
      column: 'os_login,os_password,sy_eliminate'
    };
    const data = {
      os_login: 'root',
      os_password: 'Test$Dev&App',
      sy_eliminate: '1',
    };

    service.proccessLogin(params, data).subscribe(
      () => {
        // La solicitud debería lanzar un error, por lo que este código no debería ejecutarse
        expect(true).toBe(false);
      },
      (error) => {
        // Aquí puedes verificar que el error se maneje correctamente
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${serviceEndpoint.buildApiUrl('mysql/user/login', params)}`);
    expect(req.request.method).toBe('POST');

    // Simular un error en la solicitud POST
    req.error(new ErrorEvent('Network error'));

    httpMock.verify();
  }));

});
