import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Importacion de Interfaces
import { InterfaceDataTableColumn } from 'src/app/interfaces/datatables/column.interface';
// Importacion de Servicios
import { AuthService } from 'src/app/services/functions/auth/auth.service';
import { BaseurlService } from 'src/app/services/functions/baseurl/baseurl.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { ReportService } from 'src/app/services/functions/report/report.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Funciones Generales
import {
  expFormCollect,
  expModalClass,
  expModalClose,
  expModalMapData,
  expModalReset
} from 'src/app/functions/modal-form';
// Importacion de Librerias
import * as $ from 'jquery';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

declare var Highcharts: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor (
    private router: Router,
    private serviceAuth: AuthService,
    private serviceBaseurl: BaseurlService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceReport: ReportService,
    private serviceTable: TableService,
  ) {}

  baseUrl: string = '';
  urlCurr: string = '';
  
  isLoading: boolean = false;
  respSettled: [] = [];
  respCausal: [] = [];
  respRequest: [] = [];
  respPqrs: [] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.getUrlHref();
    this.checkEndpoint();
  }

  ngAfterViewInit() {
    /*Highcharts.chart('container_basic_bar', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region',
        align: 'left'
      },
      subtitle: {
        text: 'Source: <a ' +
          'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
          'target="_blank">Wikipedia.org</a>',
        align: 'left'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
          text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        },
        gridLineWidth: 0
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          borderRadius: '50%',
          dataLabels: {
            enabled: true
          },
          groupPadding: 0.1
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Year 1990',
        data: [631, 727, 3202, 721]
      }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
      }, {
        name: 'Year 2018',
        data: [1276, 1007, 4561, 746]
      }]
    });

    // Data retrieved from https://netmarketshare.com
    Highcharts.chart('container_pie_chart', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in May, 2020',
        align: 'left'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Chrome',
          y: 70.67,
          sliced: true,
          selected: true
        }, {
          name: 'Edge',
          y: 14.77
        }, {
          name: 'Firefox',
          y: 4.86
        }, {
          name: 'Safari',
          y: 2.63
        }, {
          name: 'Internet Explorer',
          y: 1.53
        }, {
          name: 'Opera',
          y: 1.40
        }, {
          name: 'Sogou Explorer',
          y: 0.84
        }, {
          name: 'QQ',
          y: 0.51
        }, {
          name: 'Other',
          y: 2.6
        }]
      }]
    });*/
  }

  modalClass() { expModalClass(); }

  getUrlHref() {
    this.baseUrl = this.serviceBaseurl.getBaseUrl();
    this.urlCurr = this.serviceEndpoint.getCurrentUrl();
  }

  checkEndpoint() {
    if (this.serviceEndpoint.getCheckUrl()) {
      this.checkAvailability();
    } else {
      console.error('URL no válida');
    }
  }

  checkAvailability() {
    let message = '';
    this.serviceEndpoint.getAvailability().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.currentDate();
          this.resultSettled();
          this.resultCausal();
          this.resultRequest();
          this.resultPqrs();
        } else {
          message = 'Error en la solicitud de la API';
          this.modalOpen('modalSystem');
          this.modalSystemJson(message, response);
        }
      },
      error: (error) => {
        message = 'Imposible acceder a la URL';
        this.modalSystemJson(message, error);
      }
    });
  }

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) { new Modal(modalElement).show(); }
  }

  modalSystemJson(message: any, response: any) {
    console.error(message, response);
    const jStringify = JSON.stringify(response, null, 2);
    const formMssg = document.getElementById('formSystemMssg');
    if (formMssg) { formMssg.innerHTML = ''; }
    if (formMssg) { formMssg.innerHTML = `${message}`; }
    const formAjax = document.getElementById('formSystemAjax');
    if (formAjax) { formAjax.innerHTML = ''; }
    if (formAjax) { formAjax.innerHTML = `${jStringify}`; }
    this.modalOpen('modalSystem');
    this.isLoading = false;
  }

  modalSystemData(message: any, response: any) {
    console.error(message, response);
    // Mostrar alerta con los errores
    const errorMessages = response.data
      .filter((item: any) => 'error' in item)
      .map((item: { error: any; }) => item.error)
      .join('\n');
    const formMssg = document.getElementById('formSystemMssg');
    if (formMssg) { formMssg.innerHTML = ''; }
    if (formMssg) { formMssg.innerHTML = `${message}`; }
    const formAjax = document.getElementById('formSystemAjax');
    if (formAjax) { formAjax.innerHTML = ''; }
    if (formAjax) { formAjax.innerHTML = `${errorMessages}`; }
    this.modalOpen('modalSystem');
    this.isLoading = false;
  }

  getDataError(response: any): true | undefined {
    console.log(response);
    let message;
    if (response.data && Array.isArray(response.data)) {
      const tokenErrors = response.data
      .filter(
        (item: any) => 'error' in item &&
        item.error.toLowerCase().includes('token')
      )
      .map((item: any) => item.error);
      if (tokenErrors.length > 0) { this.responseToken(response); } else {
        const hasErrors = response.data.some((item: any) => 'error' in item);
        if (!hasErrors) { return true; } else {
          message = 'Identificamos los siguientes errores en la consulta';
          this.modalSystemData(message, response);
        }
      }
    } else {
      message = 'Identificamos que la solicitud no tiene un formato correcto';
      this.modalSystemData(message, response);
    }
    return undefined;
  }

  responseToken(response: any) {
    console.log(response);
    this.isLoading = false;
    const answer = response.data
    .filter((item: any) => 'error' in item)
    .map((item: { error: any; }) => item.error)
    .join(', ');
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'warning',
      title: `<h2>Advertencia!</h2>`,
    }).then(() => {
      this.actionLogout();
    });
  }

  actionLogout() {
    this.modalClass();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }

  currentDate() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Establecer las fechas en los elementos HTML correspondientes
    const dateSinceHtml = document.getElementById('settled_date_since') as HTMLInputElement;
    const dateUntilHtml = document.getElementById('settled_date_until') as HTMLInputElement;

    if (dateSinceHtml && dateUntilHtml) {
      dateSinceHtml.value = this.formatDate(firstDayOfMonth);
      dateUntilHtml.value = this.formatDate(lastDayOfMonth);
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  searchSettled() {
    console.log('searchSettled');
    let groupByHtml = document.getElementById('settled_group_by') as HTMLSelectElement;
    let dateSinceHtml = document.getElementById('settled_date_since') as HTMLInputElement;
    let dateUntilHtml = document.getElementById('settled_date_until') as HTMLInputElement;

    let groupByValue = groupByHtml?.value;
    let dateSinceValue = dateSinceHtml?.value;
    let dateUntilValue = dateUntilHtml?.value;

    console.log(groupByValue);
    console.log(dateSinceValue);
    console.log(dateUntilValue);
  }

  searchCausal() {
    console.log('searchCausal');
    let groupByHtml = document.getElementById('causal_group_by') as HTMLSelectElement;
    let dateSinceHtml = document.getElementById('causal_date_since') as HTMLInputElement;
    let dateUntilHtml = document.getElementById('causal_date_until') as HTMLInputElement;

    let groupByValue = groupByHtml?.value;
    let dateSinceValue = dateSinceHtml?.value;
    let dateUntilValue = dateUntilHtml?.value;

    console.log(groupByValue);
    console.log(dateSinceValue);
    console.log(dateUntilValue);
  }

  searchRequest() {
    console.log('searchRequest');
    let groupByHtml = document.getElementById('request_group_by') as HTMLSelectElement;
    let dateSinceHtml = document.getElementById('request_date_since') as HTMLInputElement;
    let dateUntilHtml = document.getElementById('request_date_until') as HTMLInputElement;

    let groupByValue = groupByHtml?.value;
    let dateSinceValue = dateSinceHtml?.value;
    let dateUntilValue = dateUntilHtml?.value;

    console.log(groupByValue);
    console.log(dateSinceValue);
    console.log(dateUntilValue);
  }

  searchPqrs() {
    console.log('searchPqrs');
    let groupByHtml = document.getElementById('pqrs_group_by') as HTMLSelectElement;
    let dateSinceHtml = document.getElementById('pqrs_date_since') as HTMLInputElement;
    let dateUntilHtml = document.getElementById('pqrs_date_until') as HTMLInputElement;

    let groupByValue = groupByHtml?.value;
    let dateSinceValue = dateSinceHtml?.value;
    let dateUntilValue = dateUntilHtml?.value;

    console.log(groupByValue);
    console.log(dateSinceValue);
    console.log(dateUntilValue);
  }

  reportSettled() {

  }

  reportCausal() {

  }

  reportRequest() {

  }

  reportPqrs() {

  }

  resultSettled() {
    const params = {
      groupBy: `diary`,
      dateSince: `2023-11-01`,
      dateUntil: `2023-11-30`,
    };
    this.serviceReport.reportSettled(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.respSettled = response.data;
          const buttonsData = this.serviceButton.buttonDataExport();
          let columnSet = this.setSettled();
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tableSettled',
            this.respSettled,
            columnSet,
            buttonsData
          );
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  resultCausal() {
    const params = {
      groupBy: `diary`,
      dateSince: `2023-11-01`,
      dateUntil: `2023-11-30`,
    };
    this.serviceReport.reportCausal(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.respCausal = response.data;
          const buttonsData = this.serviceButton.buttonDataExport();
          let columnSet = this.setCausal();
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tableCausal',
            this.respCausal,
            columnSet,
            buttonsData
          );
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  resultRequest() {
    const params = {
      groupBy: `diary`,
      dateSince: `2023-11-01`,
      dateUntil: `2023-11-30`,
    };
    this.serviceReport.reportRequest(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.respRequest = response.data;
          const buttonsData = this.serviceButton.buttonDataExport();
          let columnSet = this.setRequest();
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tableRequest',
            this.respRequest,
            columnSet,
            buttonsData
          );
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  resultPqrs() {
    const params = {
      groupBy: `diary`,
      dateSince: `2023-11-01`,
      dateUntil: `2023-11-30`,
    };
    this.serviceReport.reportPqrs(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.respPqrs = response.data;
          const buttonsData = this.serviceButton.buttonDataExport();
          let columnSet = this.setPqrs();
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tablePqrs',
            this.respPqrs,
            columnSet,
            buttonsData
          );
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  setSettled() {
    let columnSet = [
      {
        'title':'Fecha',
        'id':'lbl_ap_settled_os_date',
        'data':'lbl_ap_settled_os_date',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Cantidad',
        'id':'lbl_ap_settled_os_count',
        'data':'lbl_ap_settled_os_count',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
    ];
    return columnSet;
  }

  setCausal() {
    let columnSet = [
      {
        'title':'Causal',
        'id':'lbl_ap_causal_os_name',
        'data':'lbl_ap_causal_os_name',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Fecha',
        'id':'lbl_ap_settled_os_date',
        'data':'lbl_ap_settled_os_date',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Cantidad',
        'id':'lbl_ap_settled_os_count',
        'data':'lbl_ap_settled_os_count',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
    ];
    return columnSet;
  }

  setRequest() {
    let columnSet = [
      {
        'title':'Nombre',
        'id':'lbl_ap_request_os_name',
        'data':'lbl_ap_request_os_name',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Fecha',
        'id':'lbl_ap_settled_os_date',
        'data':'lbl_ap_settled_os_date',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Cantidad',
        'id':'lbl_ap_settled_os_count',
        'data':'lbl_ap_settled_os_count',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
    ];
    return columnSet;
  }

  setPqrs() {
    let columnSet = [
      {
        'title':'Fecha',
        'id':'lbl_ap_settled_os_date',
        'data':'lbl_ap_settled_os_date',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Numero',
        'id':'lbl_ap_settled_os_number',
        'data':'lbl_ap_settled_os_number',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
      {
        'title':'Estado',
        'id':'lbl_ap_state_os_name',
        'data':'lbl_ap_state_os_name',
        'type':'text',
        'className':'text-dark',
        'visible':true
      },
    ];
    return columnSet;
  }

}
