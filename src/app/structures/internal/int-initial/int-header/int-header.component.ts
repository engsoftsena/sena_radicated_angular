import { Component, OnInit } from '@angular/core';
// Importar Variables de Entorno
import { Environment } from 'src/environments/environment';
// Importacion de Servicios
import { BaseurlService } from 'src/app/services/functions/baseurl/baseurl.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Component({
  selector: 'app-int-header',
  templateUrl: './int-header.component.html',
  styleUrls: ['./int-header.component.scss']
})
export class IntHeaderComponent implements OnInit {
  dmTmpl: string = Environment.domain_tmpl;
  AppCompTitle = 'APP PQRS';

  constructor (
    private serviceBaseurl: BaseurlService,
    private serviceEndpoint: EndpointService,
  ) {}

  baseUrl: string = '';
  urlCurr: string = '';

  ngOnInit(): void {
    this.getUrlHref();
  }

  getUrlHref() {
    this.baseUrl = this.serviceBaseurl.getBaseUrl();
    this.urlCurr = this.serviceEndpoint.getCurrentUrl();
  }
}
