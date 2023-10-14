import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
// Importacion de Modulos
import { InterfaceDataTableColumn } from 'src/app/interfaces/datatables/column.interface';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlEndPoint:string = Environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  buildApiUrl(endpoint: string, params: Record<string, any>): string {
    const queryParams = new URLSearchParams(params).toString();
    return `${endpoint}${queryParams ? '?' + queryParams : ''}`;
  }

  getColumn(data: any) {
    const queryParams = {
      table: data['table'],
      column: data['column'],
    };
    const service = this.buildApiUrl(`/mysql/info/column`, queryParams);
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

  getSelect(data: any) {
    const queryParams = {
      table: data['table'],
      column: data['column'],
    };
    const service = this.buildApiUrl(`/mysql/info/select`, queryParams);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  getLabel(data: any) {
    const queryParams = {
      table: data['table'],
      column: data['column'],
    };
    const service = this.buildApiUrl(`/mysql/info/label`, queryParams);
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

  getAlias(data: any) {
    const queryParams = {
      table: data['table'],
      column: data['column'],
    };
    const service = this.buildApiUrl(`/mysql/info/alias`, queryParams);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  getRegister(data: any) {
    const queryParams = {
      table: data['table'],
      column: data['column'],
      whereField: data['whereField'],
      whereOperator: data['whereOperator'],
      whereEqual: data['whereEqual'],
    };
    const service = this.buildApiUrl(`/mysql/info/register`, queryParams);
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(urlApi);
  }

  getDelete(table: any, column: string, id: number) {
    const service = `/mysql/info/alias?table=${table}`;
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.delete(`${urlApi}`);
  }
}
