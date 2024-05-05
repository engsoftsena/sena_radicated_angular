import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Importacion de Librerias
import { Observable, catchError, of } from 'rxjs';
// Importacion de Variables de Entorno
import { Environment } from 'src/environments/environment';
// Importacion de Interfaces
import { InterfaceParams } from 'src/app/interfaces/general/params.interface';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private appEndPoint: string = Environment.backend_app;
  private netEndPoint: string = Environment.backend_net;
  private testEndPoint: string = Environment.backend_test;
  private workEndPoint: string = Environment.backend_work;

  constructor(
    private http: HttpClient
  ) { }

  private testUrl(): boolean {
    // Expresión regular para validar una URL
    const urlPattern = /^https?:\/\/\w+\.\w+/;
    return urlPattern.test(this.getEndpoint());
  }

  public buildApiUrl(endpoint: string, params: Record<string, any>): string {
    const queryParams = new URLSearchParams(params).toString();
    const formatParams = `${queryParams ? '?' + queryParams : ''}`;
    return `${this.getEndpoint()}${endpoint}${formatParams}`;
  }

  public processParams(params: InterfaceParams) {
    // Crea un nuevo objeto y copia todas las propiedades
    const rest = { ...params };
    const query: InterfaceParams = rest;
    return query;
  }

  getEndpoint() {
    const extCurrent = this.getCurrentExt() as 'app' | 'net' | 'work' | '';
    console.log('extCurrent:', extCurrent);
    const endpointMapping = {
      'app': this.appEndPoint,
      'net': this.netEndPoint,
      'work': this.workEndPoint,
      '': this.testEndPoint
    };
    return endpointMapping[extCurrent] || '';
  }

  getAvailability(): Observable<any> {
    // Realiza una solicitud HTTP GET a la URL
    return this.http.get(
      this.getEndpoint(),
      { observe: 'response' }
    ).pipe(
      catchError((error) => {
        return of(error);
      })
    );
  }

  getCheckUrl() {
    return this.testUrl();
  }

  getCurrentUrl(): string {
    const { protocol, host } = window.location;
    console.log(`${protocol}//${host}`);
    return `${protocol}//${host}`;
  }

  getCurrentExt(): string {
    const { hostname } = window.location;
    console.log('hostname', hostname);
    const parts = hostname.split('.');
    console.log('parts', parts);
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return '';
  }
}
