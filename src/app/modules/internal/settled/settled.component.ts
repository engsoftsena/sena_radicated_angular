import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { SettledModule } from 'src/app/interfaces/modules/settled.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Servicios
import { SettledService } from 'src/app/services/modules/settled/settled.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-settled',
  templateUrl: './settled.component.html',
  styleUrls: ['./settled.component.scss']
})
export class SettledComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceTable: TableService,

    private serviceSettled: SettledService,
  ) {}

  isLoading: boolean = false;
  columnSet: [] | undefined;
  settledData: SettledModule[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.checkEndpoint();
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
          message = 'URL API Disponible.';
          console.log(message);
          //this.getColumn();
          this.getLabel();
        } else {
          message = 'Error: URL API no está disponible.';
          this.modalOpen('modalSystem');
          this.modalSystemJson(message, response);
        }
      },
      error: (error) => {
        message = 'Error: Imposible acceder a la URL';
        this.modalSystemJson(message, error);
      }
    });
  }

  getColumn() {
    const params = {
      table: 'settleds',
      column: '*',
    };
    this.serviceApi.getColumn(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.getSelect();
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  getSelect() {
    const params = {
      table: 'settleds',
      column: '*',
    };
    this.serviceApi.getSelect(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.settledData = response.data;
          console.log(this.settledData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.settledData,
            this.columnSet,
            []
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

  getLabel() {
    const params = {
      table: 'settleds',
      column: '*',
    };
    this.serviceApi.getLabel(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.getAlias();
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  getAlias() {
    const params = {
      table: 'settleds',
      column: '*',
    };
    this.serviceApi.getAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.settledData = response.data;
          console.log(this.settledData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.settledData,
            this.columnSet,
            []
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

  getDataError(response: any): true | undefined {
    console.log(response);
    let message;
    if (response.data && Array.isArray(response.data)) {
      const hasErrors = response.data.some((item: any) => 'error' in item);
      if (!hasErrors) { return true; }
      if (hasErrors) {
        message = 'Identificamos los siguientes errores en la consulta';
        this.modalSystemData(message, response);
      }
    } else {
      message = 'Identificamos que la solicitud no tiene un formato correcto';
      this.modalSystemData(message, response);
    }
    return undefined;
  }

  modalClass() {
    // Buscar el elemento con las clases
    const modalBackdrop = document.querySelector('.modal-backdrop.fade.show');
    if (modalBackdrop) { modalBackdrop.remove(); }
  }

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
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

  async modalRecord(modalForm: string, modalOption: string) {
    let message;
    // Obtener el primer valor seleccionado de la tabla
    let idtbl = $('#tbInfo tr.selected td:first').html();
    // Validar si el id es mayor a cero
    if (Number(idtbl) > 0) {
      const params = {
        table: 'settleds',
        column: '*',
        whereField: `id_settled`,
        whereOperator: `=`,
        whereEqual: `${idtbl}`,
      };
      const serviceRecord = await this.serviceApi.getRecord(params);
      if (serviceRecord.data && Array.isArray(serviceRecord.data)) {
        const hasErrors = serviceRecord.data.some((item: any) => 'error' in item);
        if (hasErrors) {
          // Mostrar alerta con los errores
          const errorMessages = serviceRecord.data
            .filter((item: any) => 'error' in item)
            .map((item: { error: any; }) => item.error)
            .join(', ');
          alert(`Se encontraron errores: ${errorMessages}`);
        } else {
          // Continuar con el proceso porque no hay errores
          const modalElement = document.getElementById(modalForm);
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
            this.modalMapData(modalOption, serviceRecord);
          }
        }
      } else {
        message = 'No has seleccionado ningún registro.';
        alert(message);
      }
    }
  }
  
  modalMapData(modal: any, service: any) {
    const data = service.data[0];
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const inputField = document.querySelector(`#${modal}_${key}`) as HTMLInputElement;
          if (inputField) { inputField.value = data[key] || ''; }
        }
      }
    }
  }

  actionDelete() {

  }

  actionInsert() {

  }

  actionRemove() {

  }

  actionRestore() {

  }

  actionUpdate() {

  }
}
