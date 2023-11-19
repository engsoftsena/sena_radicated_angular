import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Importacion de Librerias
import { Observable } from 'rxjs';
// Importacion de Servicios
import { EndpointService } from '../endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private serviceEndpoint: EndpointService,
  ) { }

  private authToken = 'authToken';

  setAuthToken(token: string): void {
    sessionStorage.setItem(this.authToken, token);
  }

  getAuthToken(): string | null {
    const sessionToken = sessionStorage.getItem(this.authToken);
    if (sessionToken) { return sessionToken; }
    return null;
  }

  getAuthJwt() {
    const headers = this.getHeaders();
    if (headers == null) {
      const errorMessage = 'Token Inexistente';
      return new Observable(observer => {
        observer.error(errorMessage);
        observer.complete();
      });
    }
    const urlApi = this.serviceEndpoint.buildApiUrl(`jwt/user`, {});
    console.log(urlApi);
    return this.http.get(urlApi, { headers });
  }

  getHeaders() {
    let headers = null, authToken = this.getAuthToken();
    if (authToken != null) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
      }).set(
        'Authorization',
        `Bearer ${authToken}`
      );
    }
    return headers;
  }
}
