import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExternalService } from './external.service';
import { EndpointService } from '../endpoint/endpoint.service';
import { Router } from '@angular/router';

import { of, throwError } from 'rxjs';

function asyncData<T>(data: T) {
  return of(data);
}

describe('ExternalService', () => {
  let service: ExternalService;
  let serviceEndpoint: EndpointService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [ExternalService, EndpointService]
    });
    service = TestBed.inject(ExternalService);
    serviceEndpoint = TestBed.inject(EndpointService);
    //httpMock = TestBed.inject(HttpTestingController);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new ExternalService(httpClientSpy as any, router, serviceEndpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // test unit: function proccessLogin
  it('proccessLogin: should return expected data (HttpClient called once)', (done: DoneFn) => {
    const params = {
      table: 'tg_user',
      column: 'os_login,os_password,sy_eliminate'
    };

    const data = {
      os_login: 'root',
      os_password: 'Test$Dev&App',
      sy_eliminate: '1',
    };

    httpClientSpy.post.and.returnValue(asyncData(data));

    service.proccessLogin(params, data).subscribe({
      next: (response) => {
        expect(response).toEqual(data);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  // test unit: function proccessLogin
  it('proccessLogin: should handle error in POST request', (done: DoneFn) => {
    const params = {
      table: 'tg_user',
      column: 'os_login,os_password,sy_eliminate'
    };

    const data = {
      os_login: 'root',
      os_password: 'Test$Dev&App',
      sy_eliminate: '1',
    };

    const errorResponse = new Error('Internal Server Error');
    httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

    service.proccessLogin(params, data).subscribe({
      next: () => {
        // La solicitud debería lanzar un error, por lo que este código no debería ejecutarse
        expect(true).toBe(false);
      },
      error: (error) => {
        // Aquí puedes verificar que el error se maneje correctamente
        expect(error).toEqual(errorResponse);
        done();
      },
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  // test unit: function proccessLogin
  /*it('proccessLogin: should handle error in POST request', inject(
    [HttpTestingController], (httpMock: HttpTestingController) =>
  {
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
  }));*/

});

