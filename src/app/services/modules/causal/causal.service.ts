import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { ApiService } from '../../functions/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CausalService {
  private urlEndPoint:string = Environment.API_URL;
  
  constructor(
    private http: HttpClient,
    private serviceApi: ApiService,
  ) { }

  async getRegister(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        table: 'causals',
        column: '*',
        whereField: data['whereField'],
        whereOperator: data['whereOperator'],
        whereEqual: data['whereEqual'],
      };
      this.serviceApi.getRegister(params).subscribe({
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
