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
declare var DataTable: any;

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

  groupBy: string = '';
  dateSince: string = '';
  dateUntil: string = '';

  ngOnInit(): void {
    this.isLoading = true;
    this.getUrlHref();
    this.checkEndpoint();
  }

  ngAfterViewInit() {}

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
    this.dateChangeFul();
    let ds = 'date_since', du = 'date_until';
    this.dateMap(`settled_${ds}`, `settled_${du}`);
    this.dateMap(`causal_${ds}`, `causal_${du}`);
    this.dateMap(`request_${ds}`, `request_${du}`);
    this.dateMap(`pqrs_${ds}`, `pqrs_${du}`);
  }

  dateMap(dateSince: string, dateUntil: string) {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Establecer las fechas en los elementos HTML correspondientes
    const inputSince = document.getElementById(dateSince) as HTMLInputElement;
    const inputUntil = document.getElementById(dateUntil) as HTMLInputElement;

    if (inputSince && inputUntil) {
      inputSince.value = this.formatDate(firstDayOfMonth);
      inputUntil.value = this.formatDate(lastDayOfMonth);
    }
  }

  dateChangeFul() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.groupBy = 'diary';
    this.dateSince = this.formatDate(firstDayOfMonth);
    this.dateUntil = this.formatDate(lastDayOfMonth);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  searchResult(report: string) {
    let groupByHtml = document.getElementById(`${report}_group_by`) as HTMLSelectElement;
    let dateSinceHtml = document.getElementById(`${report}_date_since`) as HTMLInputElement;
    let dateUntilHtml = document.getElementById(`${report}_date_until`) as HTMLInputElement;
    this.groupBy = groupByHtml?.value;
    this.dateSince = dateSinceHtml?.value;
    this.dateUntil = dateUntilHtml?.value;
    if (report == 'settled') { this.resultSettled(); }
    if (report == 'causal') { this.resultCausal(); }
    if (report == 'request') { this.resultRequest(); }
    if (report == 'pqrs') { this.resultPqrs(); }
  }

  resultSettled() {
    const params = {
      groupBy: this.groupBy,
      dateSince: this.dateSince,
      dateUntil: this.dateUntil,
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
          this.reportGraphic('settled', 'Radicados', response.data);
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
      groupBy: this.groupBy,
      dateSince: this.dateSince,
      dateUntil: this.dateUntil,
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
          this.reportGraphic('causal', 'Causales', response.data);
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
      groupBy: this.groupBy,
      dateSince: this.dateSince,
      dateUntil: this.dateUntil,
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
          this.reportGraphic('request', 'Solicitudes', response.data);
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
      groupBy: this.groupBy,
      dateSince: this.dateSince,
      dateUntil: this.dateUntil,
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
          //this.reportGraphic('pqrs', 'PQRS', response.data);
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  reportGraphic(report: string, title: string, responseData: any[]) {
    let gpData = '';
    if (report == 'settled') { gpData = 'gpBasicBarSettled'; }
    if (report == 'causal') { gpData = 'gpBasicBarCausal'; }
    if (report == 'request') { gpData = 'gpBasicBarRequest'; }
    if (report == 'pqrs') { gpData = 'gpBasicBarPqrs'; }

    responseData.sort((a, b) => {
      const dateA = Date.parse(a.lbl_ap_settled_os_date);
      const dateB = Date.parse(b.lbl_ap_settled_os_date);
      return dateA - dateB;
    });

    const categories = responseData.map(item => item.lbl_ap_settled_os_date);
    const seriesData = [{
      colorByPoint: true,
      data: responseData.map(
        item => item.lbl_ap_settled_os_count
      ),
      name: 'Cantidades',
    }];

    Highcharts.chart(gpData, {
      chart: {
        type: 'bar',
      },
      title: {
        text: `Reporte ${title}`,
        align: 'center',
      },
      xAxis: {
        categories: categories,
        gridLineWidth: 1,
        tickInterval: 1,
      },
      yAxis: {
        allowDecimals: false,
        gridLineWidth: 1,
        min: 0,
        labels: {
          overflow: 'justify',
        },
        title: {
          text: 'Valores',
        },
        tickInterval: 1,
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          borderRadius: '0%',
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
          groupPadding: 0.1,
          pointPadding: 0.1,
          pointWidth: 25,
        },
      },
      series: seriesData,
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

  adjustColumn(tableId: string) {
    this.serviceTable.adjustColumns('tableSettled');
    this.serviceTable.adjustColumns('tableCausal');
    this.serviceTable.adjustColumns('tableRequest');
    this.serviceTable.adjustColumns('tablePqrs');
    
    document.querySelectorAll('a[data-toggle="tab"]').forEach((element) => {
      element.addEventListener('shown.bs.tab', () => {
        this.serviceTable.adjustColumns(tableId);
      });
    });
  }
  
}
