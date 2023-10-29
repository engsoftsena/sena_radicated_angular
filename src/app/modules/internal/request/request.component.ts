import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { RequestModule } from 'src/app/interfaces/modules/request.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Servicios
import { RequestService } from 'src/app/services/modules/request/request.service';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceTable: TableService,

    private serviceRequest: RequestService,
  ) {}

  isLoading: boolean = false;
  columnSet: [] | undefined;
  requestData: RequestModule[] = [];

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
          this.getLabel('registers');
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

  getColumn() {
    const params = {
      table: 'requests',
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
      table: 'requests',
      column: '*',
    };
    this.serviceApi.getSelect(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.requestData = response.data;
          console.log(this.requestData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.requestData,
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

  getLabel(fieldDeleted: string) {
    const params = {
      table: 'requests',
      column: '*',
    };
    this.serviceApi.getLabel(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.getAlias(fieldDeleted);
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  getAlias(fieldDeleted: string) {
    const params = {
      table: 'requests',
      column: '*',
      whereCond: 'WHERE',
      whereField: 'deleted',
      whereOperator: '=',
      whereEqual: fieldDeleted,
    };
    this.serviceApi.getAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.requestData = response.data;
          console.log(this.requestData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.requestData,
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

  getRegister(data: any) {
    const params = {
      table: 'requests',
      column: '*',
      whereCond: data['whereCond'],
      whereField: data['whereField'],
      whereOperator: data['whereOperator'],
      whereEqual: data['whereEqual'],
    };
    this.serviceApi.getRegister(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.requestData = response.data;
        console.log(this.requestData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.requestData,
          this.columnSet,
          []
        );
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

  tableDataFilter() {
    const tableData = document.getElementById('tableData') as HTMLFormElement;
    if (tableData) { this.getLabel(tableData['value']); }
  }

  modalClass() {
    // Buscar el elemento con las clases
    const modalBackdrop = document.querySelector('.modal-backdrop.fade.show');
    if (modalBackdrop) {
      modalBackdrop.remove();
      modalBackdrop.classList.remove(
        'modal-backdrop',
        'fade',
        'show'
      );
    }
  }

  modalClose(modalForm: string) {
    // JavaScript para cerrar la ventana modal
    const miModal = document.getElementById(modalForm);
    if (miModal) { miModal.style.display = 'none'; }
    this.modalClass();
  }

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) { new Modal(modalElement).show(); }
  }

  modalReset(modalForm: string) {
    const formulario = document.getElementById(modalForm) as HTMLFormElement;
    // Verificar si el formulario existe y es un elemento de formulario antes de resetearlo
    if (formulario && formulario instanceof HTMLFormElement) { formulario.reset(); }
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
        table: 'requests',
        column: '*',
        whereCond: ``,
        whereField: `id_request`,
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
          console.error(`Se encontraron errores: ${errorMessages}`);
        } else {
          // Continuar con el proceso porque no hay errores
          this.modalOpen(modalForm);
          this.modalMapData(modalOption, serviceRecord);
        }
      } else {
        message = 'No tiene un formato en array.';
        const swalOptions = {
          'swalMessage': message,
          'swalIcon': 'error',
          'swalTitle': 'Error',
        };
        this.swalFireMssg(swalOptions);
      }
    } else {
      message = 'No has seleccionado ningún registro.';
      const swalOptions = {
        'swalMessage': message,
        'swalIcon': 'warning',
        'swalTitle': 'Advertencia',
      };
      this.swalFireMssg(swalOptions);
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

  valGetElementById(elementId: string): HTMLElement | null {
    const element = document.getElementById(elementId);
    let errorMessage = `Elemento HTML con ID '${elementId}' no existe`;
    if (!element) { console.error(errorMessage); }
    return element;
  }

  formCollect(modalForm: any, formField: any) {
    const { formId, formPrefix } = modalForm;
    const formData: { [key: string]: string } = {};

    let valFormId = this.valGetElementById(formId);
    if (!valFormId) { return formData }

    let valformField = this.valGetElementById(formField);
    if (!valformField) { return formData }

    const allElements = Array.from(valformField.querySelectorAll('*'));
    for (const element of allElements) {
      if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
        const fieldName = element.getAttribute('name');

        if (fieldName) {
          const lizedField = fieldName.replace(formPrefix, '');
          formData[lizedField] = element.value;
        } else {
          console.error('No existe la propiedad name');
        }
      }
    }

    return formData;
  }

  formDelete(modalForm: any) {
    const whereForm = this.formCollect(modalForm, 'deleteWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionDelete() {
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalDelete',
      'formId': 'formDeleteData',
      'formAjax': 'formDeleteAjax',
      'formPrefix': 'delete_',
    };
    // Retornar Informacion
    const {
      whereColumn,
      whereData,
    } = this.formDelete(modalForm);
    // Construir parametros para sql
    const params = {
      table: 'requests',
      column: `${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendDelete(modalForm, params);
  }

  sendDelete(modalForm: any, params: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.getDelete(params).subscribe({
      next: (response) => {
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud DELETE de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  formInsert(modalForm: any) {
    const formData = this.formCollect(modalForm, 'insertField');
    const dataColumn = Object.keys(formData).join(',');
    return { formData, dataColumn, };
  }

  actionInsert() {
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalInsert',
      'formId': 'formInsertData',
      'formAjax': 'formInsertAjax',
      'formPrefix': 'insert_',
    };
    // Retornar Informacion
    const { formData, dataColumn, } = this.formInsert(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      table: 'requests',
      column: dataColumn,
    };
    this.sendInsert(modalForm, params, jsonData);
  }

  sendInsert(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.getInsert(params, jsonData).subscribe({
      next: (response) => {
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud INSERT de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  formRemove(modalForm: any) {
    const formData = this.formCollect(modalForm, 'removeField');
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = this.formCollect(modalForm, 'removeWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionRemove() {
    this.htmlInputChange('remove_deleted', 'removeds');
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalRemove',
      'formId': 'formRemoveData',
      'formAjax': 'formRemoveAjax',
      'formPrefix': 'remove_',
    };
    // Retornar Informacion
    const {
      formData,
      dataColumn,
      whereColumn,
      whereData,
    } = this.formRemove(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      table: 'causals',
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  formRestore(modalForm: any) {
    const formData = this.formCollect(modalForm, 'restoreField');
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = this.formCollect(modalForm, 'restoreWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionRestore() {
    this.htmlInputChange('restore_deleted', 'registers');
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalRestore',
      'formId': 'formRestoreData',
      'formAjax': 'formRestoreAjax',
      'formPrefix': 'restore_',
    };
    // Retornar Informacion
    const {
      formData,
      dataColumn,
      whereColumn,
      whereData,
    } = this.formRestore(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      table: 'causals',
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  formUpdate(modalForm: any) {
    const formData = this.formCollect(modalForm, 'updateField');
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = this.formCollect(modalForm, 'updateWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionUpdate() {
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalUpdate',
      'formId': 'formUpdateData',
      'formAjax': 'formUpdateAjax',
      'formPrefix': 'update_',
    };
    // Retornar Informacion
    const {
      formData,
      dataColumn,
      whereColumn,
      whereData,
    } = this.formUpdate(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      table: 'requests',
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  sendUpdate(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.getUpdate(params, jsonData).subscribe({
      next: (response) => {
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud UPDATE de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  responseMessage(modalForm: any, response: any) {
    let message;
    if (response.data && Array.isArray(response.data)) {
      const respSuccess = response.data.some((item: any) => 'success' in item);
      if (respSuccess) { this.responseSuccess(modalForm, response); }
      const respWarnign = response.data.some((item: any) => 'warning' in item);
      if (respWarnign) { this.responseWarning(modalForm, response); }
      const respError = response.data.some((item: any) => 'error' in item);
      if (respError) { this.getDataError(response); }
    } else {
      message = 'No tiene un formato en array.';
      const swalOptions = {
        'swalMessage': message,
        'swalIcon': 'error',
        'swalTitle': 'Error',
      };
      this.swalFireMssg(swalOptions);
  }
  }

  responseSuccess(modalForm: any, response: any) {
    const { modalId, formId } = modalForm;
    this.modalClose(modalId);
    this.modalReset(formId);
    const answer = response.data
      .filter((item: any) => 'success' in item)
      .map((item: { success: any; }) => item.success)
      .join(', ');
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'success',
      title: `<h2>Completado!</h2>`,
    }).then(() => {
      this.dataProccess();
    });
  }

  responseWarning(modalForm: any, response: any) {
    const { modalId, formId } = modalForm;
    const answer = response.data
      .filter((item: any) => 'warning' in item)
      .map((item: { warning: any; }) => item.warning)
      .join(', ');
    console.log(answer);
  }

  dataProccess() {
    let timerInterval: any;
    Swal.fire({
      title: 'Procesando',
      html: 'Espere un momento...',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');

        if (b) {
          const timerLeft = Swal.getTimerLeft();
          if (timerLeft !== undefined) {
            b.textContent = timerLeft.toString();
          }
        }

        const alertBox = Swal.getPopup();
        if (alertBox) { alertBox.style.textAlign = 'center'; }

        timerInterval = setInterval(() => {
          const timerLeft = Swal.getTimerLeft();
          if (timerLeft !== undefined && b) {
            b.textContent = timerLeft.toString();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Puedes agregar un manejo adicional aquí si lo deseas */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.getLabel('registers');
      }
    });
  }

  swalFireMssg(swalOptions: any) {
    const { swalMessage, swalIcon, swalTitle } = swalOptions;
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${swalMessage}</span>`,
      icon: swalIcon,
      title: `<h2>${swalTitle}!</h2>`,
    });
  }

  htmlInputChange(inputId: string, value: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) { inputElement.value = value; }
  }
}
