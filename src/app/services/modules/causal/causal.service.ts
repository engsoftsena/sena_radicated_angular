import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
// Importacion de Modulos
import { InterfaceDataTableColumn } from 'src/app/interfaces/datatables/column.interface';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CausalService {
  private urlEndPoint:string = Environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getColumn(table: any) {
    const service = `/mysql/info/label?table=${table}`;
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

  getSelect(table: any) {
    const select = `select=*`;
    const orderby = `orderBy=id_role`;
    const ordermode = `&orderMode=DESC`;
    //const urlApi = `${this.urlEndPoint}/${table}?${select}&${orderby}&${ordermode}`;
    const service = `/mysql/info/alias?table=${table}`;
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(`${urlApi}`);
  }

  getByColumn(table: any, where: any, value: any) {
    const service = `/mysql/info/alias?table=${table}`;
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.get(`${urlApi}`);
  }

  getInsert(table: any, data: any) {
    const service = `/mysql/info/alias?table=${table}`;
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.post(`${urlApi}`, JSON.stringify(data));
  }

  getUpdate(table: any, data: any, where: any, value: any) {
    const service = `/mysql/info/alias?table=${table}`;
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.put(`${urlApi}`, JSON.stringify(data));
  }

  getDelete(table: any, id: number) {
    const service = `/mysql/info/alias?table=${table}`;
    const urlApi = `${this.urlEndPoint}${service}`;
    console.log(urlApi);
    return this.http.delete(`${urlApi}`);
  }
}
