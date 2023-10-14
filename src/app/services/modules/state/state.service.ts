import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
import { ApiService } from '../../functions/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private urlEndPoint:string = Environment.API_URL;

  constructor(
    private http: HttpClient,
    private serviceApi: ApiService,
  ) { }

  async getRegister(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        table: 'states',
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
}
