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
  private urlEndPoint: string = Environment.backend_test;

  constructor(
    private http: HttpClient
  ) { }

  private testUrl(): boolean {
    // Expresión regular para validar una URL
    const urlPattern = /^https?:\/\/\w+\.\w+/;
    return urlPattern.test(this.urlEndPoint);
  }

  public buildApiUrl(endpoint: string, params: Record<string, any>): string {
    let extCurrent = this.getCurrentExt();
    console.log(`extCurrent: ${extCurrent}`);
    const queryParams = new URLSearchParams(params).toString();
    const formatParams = `${queryParams ? '?' + queryParams : ''}`;
    return `${this.urlEndPoint}${endpoint}${formatParams}`;
  }

  public processParams(params: InterfaceParams) {
    // Crea un nuevo objeto y copia todas las propiedades
    const rest = { ...params };
    const query: InterfaceParams = rest;
    return query;
  }

  getAvailability(): Observable<any> {
    // Realiza una solicitud HTTP GET a la URL
    return this.http.get(
      this.urlEndPoint,
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
    const pathSegments = window.location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const parts = lastSegment.split('.');
    if (parts.length > 1) {
        return parts[parts.length - 1];
    }
    return '';
  }
}
