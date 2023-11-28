import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importacion de Librerias
import { EMPTY, Observable, catchError, map, throwError } from 'rxjs';
// Importacion de Interfaces
import { InterfaceDataTableColumn } from 'src/app/interfaces/datatables/column.interface';
// Importacion de Servicios
import { AuthService } from '../auth/auth.service';
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  infoColumn(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/info/column`, query);
    console.log(urlApi);
    return this.http.get<InterfaceDataTableColumn[]>(urlApi, { headers }).pipe(
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

  infoSelect(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/info/select`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  infoLabel(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/info/label`, query);
    console.log(urlApi);
    return this.http.get<InterfaceDataTableColumn[]>(urlApi, { headers }).pipe(
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

  infoAlias(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/info/alias`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  innerLabel(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/inner/label`, query);
    console.log(urlApi);
    return this.http.get<InterfaceDataTableColumn[]>(urlApi, { headers }).pipe(
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

  innerAlias(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/inner/alias`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  unionModule(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/union/module`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  unionMenu(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/union/menu`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  proccessRegister(params: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/info/register`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
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

  proccessDelete(params: any, data: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/delete/data`, query);
    // Configura las cabeceras para indicar que se envía JSON
    //const headers = new HttpHeaders({
      //'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    //});
    // Peticion solicitada al Backend
    return this.http.delete(urlApi, {
      headers,
      withCredentials: false,
    }).pipe(
      catchError((error) => {
        // Manejar el error aquí
        console.error('Error en la solicitud DELETE:', error);
        // Retornar error original
        return throwError(() => error);
      })
    );
  }

  proccessInsert(params: any, data: any) {
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/insert/data`, query);
    // Configura las cabeceras para indicar que se envía JSON
    //const headers = new HttpHeaders({
      //'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    //});
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
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/update/data`, query);
    // Configura las cabeceras para indicar que se envía JSON
    //const headers = new HttpHeaders({
      //'Content-Type': 'application/json',
      //'Content-Type': 'application/x-www-form-urlencoded',
    //});
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
    const headers = this.authToken();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/html/select`, query);
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
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
