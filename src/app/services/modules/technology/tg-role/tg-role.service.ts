import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'src/environments/environment';
// Importacion de Librerias
import { catchError, throwError } from 'rxjs';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class TgRoleService {
  constructor(
    private http: HttpClient,
    private serviceApi: ApiService,
    private serviceEndpoint: EndpointService,
  ) { }

  proccessInsert(params: any, data: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/insert/tg/role`, query);
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
}
