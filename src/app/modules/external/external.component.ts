import { Component, OnInit } from '@angular/core';
// Importacion de Servicios
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {
  AppCompTitle = 'APP PQRS';

  constructor (
    private serviceEndpoint: EndpointService,
  ) {}
  
  urlBase: string = '';

  ngOnInit(): void {
    this.getUrlHref();
  }

  getUrlHref() {
    this.urlBase = this.serviceEndpoint.getCurrentUrl();
  }
}
