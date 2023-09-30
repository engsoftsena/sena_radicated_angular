import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private urlEndPoint:string = Environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  getSelect() {
    const table = `patients`;
    const select = `select=*`;
    const orderby = `orderBy=id_patient`;
    const ordermode = `&orderMode=DESC`;
    const urlApi = `${this.urlEndPoint}/${table}?${select}&${orderby}&${ordermode}`;
    console.log(urlApi);
    return this.http.get(`${urlApi}`);
  }
}
