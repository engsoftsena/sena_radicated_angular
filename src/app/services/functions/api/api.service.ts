import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importacion de Librerias
import { catchError, map, throwError } from 'rxjs';
// Importacion de Interfaces
import { InterfaceDataTableColumn } from 'src/app/interfaces/datatables/column.interface';
// Importacion de Servicios
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private serviceEndpoint: EndpointService,
  ) { }

  proccessColumn(params: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/inner/label`, query);
    console.log(urlApi);
    return this.http.get<InterfaceDataTableColumn[]>(urlApi).pipe(
      map((response: any) => {
        if (Array.isArray(response.data)) {
          const columnSet = response.data.map((data: InterfaceDataTableColumn) => {
            const title = data.Comment;
            const result = data.Label || data.Field;
            return {
              title: title,
              id: result,
              data: result,
              type: 'text',
              className: 'text-dark',
              visible: true,
            };
          });
          return columnSet;
        } else {
          return [];
        }
      })
    );
  }

  proccessData(params: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/inner/alias`, query);
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  proccessRegister(params: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/info/register`, query);
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  async resolveRegister(params: any): Promise<any> {
    const query = this.serviceEndpoint.processParams(params);
    return new Promise((resolve, reject) => {
      this.proccessRegister(query).subscribe({
        next: (response: any) => {
          //console.log(response);
          // Resolver la promesa
          resolve(response);
        },
        error: (err: any) => {
          // Rechazar la promesa
          //console.error(err);
          reject(err);
        },
        complete: () => {
          // Resolver la promesa
          resolve(null);
        },
      });
    });
  }

  proccessDelete(params: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/delete/data`, query);
    // Configura las cabeceras para indicar que se envía JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    });
    // Peticion solicitada al Backend
    return this.http.delete(urlApi, {
      headers,
      withCredentials: false,
    }).pipe(
      catchError((error) => {
        // Manejar el error aquí
        console.error('Error en la solicitud PUT:', error);
        // Retornar error original
        return throwError(() => error);
      })
    );
  }

  proccessInsert(params: any, data: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/insert/data`, query);
    // Configura las cabeceras para indicar que se envía JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    });
    // Peticion solicitada al Backend
    return this.http.post(urlApi, data, {
      headers,
      withCredentials: false,
    }).pipe(
      catchError((error) => {
        // Manejar el error aquí
        console.error('Error en la solicitud POST:', error);
        // Retornar error original
        return throwError(() => error);
      })
    );
  }

  proccessUpdate(params: any, data: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/update/data`, query);
    // Configura las cabeceras para indicar que se envía JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    });
    // Peticion solicitada al Backend
    return this.http.put(urlApi, data, {
      headers,
      withCredentials: false,
    }).pipe(
      catchError((error) => {
        // Manejar el error aquí
        console.error('Error en la solicitud PUT:', error);
        // Retornar error original
        return throwError(() => error);
      })
    );
  }

  proccessHtmlSelect(params: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/html/select`, query);
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  async resolveHtmlSelect(params: any): Promise<any> {
    const query = this.serviceEndpoint.processParams(params);
    return new Promise((resolve, reject) => {
      this.proccessHtmlSelect(query).subscribe({
        next: (response: any) => {
          //console.log(response);
          // Resolver la promesa
          resolve(response);
        },
        error: (err: any) => {
          // Rechazar la promesa
          //console.error(err);
          reject(err);
        },
        complete: () => {
          // Resolver la promesa
          resolve(null);
        },
      });
    });
  }
}
