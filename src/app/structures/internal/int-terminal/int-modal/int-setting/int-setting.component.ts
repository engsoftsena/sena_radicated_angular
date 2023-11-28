import { Component, OnInit } from '@angular/core';
// Importacion de Servicios
import { BaseurlService } from 'src/app/services/functions/baseurl/baseurl.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Component({
  selector: 'app-int-setting',
  templateUrl: './int-setting.component.html',
  styleUrls: ['./int-setting.component.scss']
})
export class IntSettingComponent implements OnInit {
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
