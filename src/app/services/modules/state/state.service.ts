import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private urlEndPoint:string = Environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getSelect() {
    const table = `states`;
    const select = `select=*`;
    const orderby = `orderBy=id_state`;
    const ordermode = `&orderMode=DESC`;
    const urlApi = `${this.urlEndPoint}/${table}?${select}&${orderby}&${ordermode}`;
    console.log(urlApi);
    return this.http.get(`${urlApi}`);
  }
}
