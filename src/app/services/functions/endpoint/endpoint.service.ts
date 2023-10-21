import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private urlEndPoint:string = Environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  private testUrl(): boolean {
    // Expresión regular para validar una URL
    const urlPattern = /^https?:\/\/\w+\.\w+/;
    return urlPattern.test(this.urlEndPoint);
  }

  getAvailability(): Observable<any> {
    // Realiza una solicitud HTTP GET a la URL
    return this.http.get(
      this.urlEndPoint,
      { observe: 'response' }
    ).pipe(
      catchError((error) => {
        //console.error('Error: Imposible acceder a la URL:', error);
        return of(error);
      })
    );
  }

  getCheckUrl() {
    return this.testUrl();
  }
}
