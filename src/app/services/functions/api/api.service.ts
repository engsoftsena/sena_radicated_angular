import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
// Importacion de Modulos
import { InterfaceDataTableColumn } from 'src/app/interfaces/datatables/column.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlEndPoint:string = Environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  private buildApiUrl(endpoint: string, params: Record<string, any>): string {
    const queryParams = new URLSearchParams(params).toString();
    return `${endpoint}${queryParams ? '?' + queryParams : ''}`;
  }

  getColumn(params: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/info/column`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get<InterfaceDataTableColumn[]>(urlApi).pipe(
      map((response: any) => {
        if (Array.isArray(response.data)) {
          const columnSet = response.data.map((data: InterfaceDataTableColumn) => ({
            title: data.Comment,
            id: data.Field,
            data: data.Field,
            type: 'text',
            className: 'text-dark',
            visible: true,
          }));
          return columnSet;
        } else {
          return [];
        }
      })
    );
  }

  getSelect(params: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/info/select`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  getLabel(params: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/info/label`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get<InterfaceDataTableColumn[]>(urlApi).pipe(
      map((response: any) => {
        if (Array.isArray(response.data)) {
          const columnSet = response.data.map((data: InterfaceDataTableColumn) => ({
            title: data.Comment,
            id: data.Label,
            data: data.Label,
            type: 'text',
            className: 'text-dark',
            visible: true,
          }));
          return columnSet;
        } else {
          return [];
        }
      })
    );
  }

  getAlias(params: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/info/alias`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  getRegister(params: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/info/register`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  async getRecord(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = {
        table: params['table'],
        column: params['column'],
        whereCond: params['whereCond'],
        whereField: params['whereField'],
        whereOperator: params['whereOperator'],
        whereEqual: params['whereEqual'],
      };
      this.getRegister(query).subscribe({
        next: (response: any) => {
          console.log(response);
          // Resuelve la promesa con los datos obtenidos
          resolve(response);
        },
        error: (err: any) => {
          // Rechaza la promesa en caso de error
          console.error(err);
          reject(err);
        },
        complete: () => {
          // Resuelve la promesa cuando se completa, si es necesario
          resolve(null);
        },
      });
    });
  }

  getDelete(params: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/delete`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
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

  getInsert(params: any, data: any) {
    const query = {
      table: params['table'],
      column: params['column'],
    };
    const service = this.buildApiUrl(`mysql/insert`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
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

  getUpdate(params: any, data: any) {
    const query = {
      table: params['table'],
      column: params['column'],
      whereCond: params['whereCond'],
      whereField: params['whereField'],
      whereOperator: params['whereOperator'],
      whereEqual: params['whereEqual'],
    };
    const service = this.buildApiUrl(`mysql/update`, query);
    const urlApi = `${this.urlEndPoint}${service}`;
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
}
