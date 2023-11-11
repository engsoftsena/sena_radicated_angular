import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importacion de Librerias
import { catchError, map, throwError } from 'rxjs';
// Importacion de Servicios
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {  
  constructor(
    private http: HttpClient,
    private router: Router,
    private serviceEndpoint: EndpointService,
  ) { }

  proccessAuth() {
    const tgUser = sessionStorage.getItem('tgUser');
    if (tgUser != null || tgUser != '') {
      this.router.navigate(['internal/dashboard']);
    }
  }

  proccessLogin(params: any, data: any) {
    const query = this.serviceEndpoint.processParams(params);
    const urlApi = this.serviceEndpoint.buildApiUrl(`mysql/user/login`, query);
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
