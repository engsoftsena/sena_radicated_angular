import { Component, OnInit } from '@angular/core';
// Importacion de Servicios
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Component({
  selector: 'app-int-setting',
  templateUrl: './int-setting.component.html',
  styleUrls: ['./int-setting.component.scss']
})
export class IntSettingComponent implements OnInit {
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
