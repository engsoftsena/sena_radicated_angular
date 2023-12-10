import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importacion de Librerias
import { Observable, catchError, map, throwError } from 'rxjs';
// Importacion de Servicios
import { AuthService } from '../auth/auth.service';
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(
    private http: HttpClient,
    private serviceAuth: AuthService,
    private serviceEndpoint: EndpointService,
  ) { }

  serviceToken = this.serviceAuth.getAuthToken();

  authToken() {
    let headers = null, authToken = this.serviceToken;
    if (authToken != null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      }).set(
        'Authorization',
        `Bearer ${this.serviceToken}`
      );
    }
    return headers;
  }

  reportSettled(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/report/settled`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  reportCausal(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/report/causal`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  reportRequest(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/report/request`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  reportPqrs(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/report/pqrs`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }
}
