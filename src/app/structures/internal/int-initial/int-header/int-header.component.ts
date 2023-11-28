import { Component, OnInit } from '@angular/core';
// Importacion de Servicios
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Component({
  selector: 'app-int-header',
  templateUrl: './int-header.component.html',
  styleUrls: ['./int-header.component.scss']
})
export class IntHeaderComponent implements OnInit {
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
