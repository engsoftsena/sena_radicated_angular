import { Component, OnInit } from '@angular/core';
import { BaseurlService } from 'src/app/services/functions/baseurl/baseurl.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {
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
