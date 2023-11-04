import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Importacion de Modulos
import { ApTraceabilityModule } from 'src/app/interfaces/modules/application/traceability.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Servicios
import { TraceabilityService } from 'src/app/services/modules/application/ap-traceability/ap-traceability.service';
// Importacion de Funciones Generales
import { fncInputChange } from 'src/app/functions/input-html';
import { fncFormCollect } from 'src/app/functions/modal-form';
import { fncRplPrefixString } from 'src/app/functions/replace-prefix';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ap-traceability',
  templateUrl: './ap-traceability.component.html',
  styleUrls: ['./ap-traceability.component.scss']
})
export class ApTraceabilityComponent implements OnInit {
  @ViewChild('tableData') tableData: ElementRef | undefined;

  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceTable: TableService,

    private serviceTraceability: TraceabilityService,
  ) {}

  tableComponent: string = 'ap_traceability';
  tableSysEliminate: string = 'sy_eliminate';
  deletedData: any;
  isLoading: boolean = false;
  columnSet: [] | undefined;
  traceabilityData: ApTraceabilityModule[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.checkEndpoint();
  }

  ngAfterViewInit() {
    this.tableDataValue();
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
          this.resultColumn(this.deletedData);
          this.selectHtmlModal();
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

  resultColumn(fieldDeleted: string) {
    const params = {
      table: this.tableComponent,
      column: '*',
      whereCond: '',
      whereField: '',
      whereOperator: '',
      whereEqual: '',
    };
    this.serviceApi.proccessColumn(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.resultData(fieldDeleted);
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  resultData(fieldDeleted: string) {
    const params = {
      table: this.tableComponent,
      column: '*',
      whereCond: 'WHERE',
      whereField: this.tableSysEliminate,
      whereOperator: '=',
      whereEqual: fieldDeleted,
    };
    this.serviceApi.proccessData(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.traceabilityData = response.data;
          console.log(this.traceabilityData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.traceabilityData,
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
      table: this.tableComponent,
      column: '*',
      whereCond: data['whereCond'],
      whereField: data['whereField'],
      whereOperator: data['whereOperator'],
      whereEqual: data['whereEqual'],
    };
    this.serviceApi.proccessRegister(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.traceabilityData = response.data;
        console.log(this.traceabilityData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.traceabilityData,
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

  tableDataValue(load: boolean = false) {
    if (this.tableData && this.tableData.nativeElement instanceof HTMLSelectElement) {
      const selectedValue = this.tableData.nativeElement.value;
      this.deletedData = selectedValue;
    }
    this.tableDataFilter(load);
  }

  tableDataFilter(load: boolean = false) {
    if (load) { this.resultColumn(this.deletedData); }
    if (this.deletedData == '1') { this.tableDataRegister(); }
    if (this.deletedData == '2') { this.tableDataRemove(); }
  }

  tableDataRegister() {
    this.tableDataBtn('remove', 'modalInsertBtn');
    this.tableDataBtn('remove', 'modalUpdateBtn');
    this.tableDataBtn('remove', 'modalRemoveBtn');
    this.tableDataBtn('append', 'modalRestoreBtn');
    this.tableDataBtn('append', 'modalDeleteBtn');
  }

  tableDataRemove() {
    this.tableDataBtn('append', 'modalInsertBtn');
    this.tableDataBtn('append', 'modalUpdateBtn');
    this.tableDataBtn('append', 'modalRemoveBtn');
    this.tableDataBtn('remove', 'modalRestoreBtn');
    this.tableDataBtn('remove', 'modalDeleteBtn');
  }

  tableDataBtn(classList: any, reference: any) {
    let btnData = document.getElementById(reference) as HTMLFormElement;
    if (classList == 'append') { btnData.classList.add('d-none'); }
    if (classList == 'remove') { btnData.classList.remove('d-none'); }
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
        table: this.tableComponent,
        column: '*',
        whereCond: `WHERE`,
        whereField: `id_register`,
        whereOperator: `=`,
        whereEqual: `${idtbl}`,
      };
      const serviceResolve = await this.serviceApi.resolveRegister(params);
      if (serviceResolve.data && Array.isArray(serviceResolve.data)) {
        const hasErrors = serviceResolve.data.some((item: any) => 'error' in item);
        if (hasErrors) {
          let message = 'Ocurrió un error en la solicitud';
          this.modalSystemData(message, serviceResolve);
        } else {
          // Continuar con el proceso porque no hay errores
          this.modalOpen(modalForm);
          this.modalMapData(modalOption, serviceResolve);
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
    if (!data) { return; }
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const fieldHtml = document.querySelector(`#${modal}_${key}`);
        if (fieldHtml instanceof HTMLInputElement) {
          this.handleInputField(fieldHtml, data[key]);
        }
        if (fieldHtml instanceof HTMLSelectElement) {
          this.handleSelectField(fieldHtml, data[key]);
        }
      }
    }
  }

  handleInputField(inputElement: HTMLInputElement, value: any) {
    inputElement.value = value || '';
  }

  handleSelectField(selectElement: HTMLSelectElement, value: any) {
    const valueToSelect = (value || '').trim().toLowerCase();
    const options = Array.from(selectElement.options);
    for (const option of options) {
      const optionValue = option.value.trim().toLowerCase();
      if (optionValue === valueToSelect) {
        option.selected = true;
        break;
      }
    }
  }

  selectHtmlModal() {
    let modalIds = ['modalInsert', 'modalUpdate'];
    let prefixes = ['insert_', 'update_'];
    let idHtmlSet = new Set<string>();
    for (let i = 0; i < modalIds.length; i++) {
      const modalItem = modalIds[i];
      const modalElement = document.getElementById(modalItem);
      if (modalElement) {
        const prefix = prefixes[i];
        // Obtén los valores de idHtml y agrega los valores únicos al Set
        this.selectHtmlCharge(modalElement, prefix).forEach((value) => {
          idHtmlSet.add(value);
        });
      }
    }
    // Convierte el Set en un array de strings
    const idHtmlValues = Array.from(idHtmlSet);
    // Llama a la función con valores reemplazados
    this.selectHtmlSearch(prefixes, idHtmlValues);
  }

  selectHtmlCharge(modalForm: any, modalPrefix: any) {
    // Busca todos los elementos <select> dentro del modal
    const selectElements = modalForm.querySelectorAll('select') as HTMLSelectElement[];
    // Itera sobre los elementos <select> y obtén sus atributos id
    const idHtml = Array.from(selectElements).map((item) =>
      fncRplPrefixString(item.id, modalPrefix)
    );
    return idHtml;
  }

  selectHtmlSearch(modalPrefix: any, idHtml: string[]) {
    idHtml.forEach((item) => {
      // Construir parametros para sql
      const params = {
        table: this.tableComponent,
        htmlSelect: item,
      };
      this.selectHtmlSend(modalPrefix, params);
    });
  }

  selectHtmlSend(modalPrefix: any, params: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.proccessHtmlSelect(params).subscribe({
      next: (response) => {
        console.log(response);
        this.selectHtmlMap(modalPrefix, params, response);
      },
      error: (error) => {
        message = 'Error en la solicitud GET de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  selectHtmlMap(modalPrefixes: string[], params: any, response: any) {
    // Compara params.htmlSelect con response.query_params.htmlSelect
    if (params.htmlSelect === response.query_params.htmlSelect) {
      const selectElements: HTMLSelectElement[] = [];
      // Recorre los prefijos y crea las combinaciones
      for (const prefix of modalPrefixes) {
        const prefixComb = `${prefix}${params.htmlSelect}`;
        const elements: HTMLSelectElement[] = Array.from(
          document.querySelectorAll(`select[id^="${prefixComb}"]`)
        );
        selectElements.push(...elements);
      }
      selectElements.forEach((selectElement) => {
        // Limpia las opciones actuales del select
        selectElement.innerHTML = '';
        // Agregar la opción "Seleccionar Registro"
        const selectPromptOption = document.createElement('option');
        selectPromptOption.value = '';
        selectPromptOption.textContent = 'Seleccionar Registro';
        selectElement.appendChild(selectPromptOption);
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Si hay datos, agrega las opciones
          response.data.forEach((item: any) => {
            const option = document.createElement('option');
            option.value = item.id_register;
            option.textContent = item.os_name;
            selectElement.appendChild(option);
          });
        } else {
          // Si no hay datos, agrega la opción "Sin Resultados"
          const noResultsOption = document.createElement('option');
          noResultsOption.value = '';
          noResultsOption.textContent = 'Sin Resultados';
          selectElement.appendChild(noResultsOption);
        }
      });
    }
  }

  formDelete(modalForm: any) {
    const whereForm = fncFormCollect(modalForm, 'deleteWhere');
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
      table: this.tableComponent,
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
    this.serviceApi.proccessDelete(params).subscribe({
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
    const formData = fncFormCollect(modalForm, 'insertField');
    formData[this.tableSysEliminate] = '1';
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
      table: this.tableComponent,
      column: dataColumn,
    };
    this.sendInsert(modalForm, params, jsonData);
  }

  sendInsert(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.proccessInsert(params, jsonData).subscribe({
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
    const formData = fncFormCollect(modalForm, 'removeField');
    formData[this.tableSysEliminate] = '2';
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = fncFormCollect(modalForm, 'removeWhere');
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
    fncInputChange('remove_tb_eliminate', '2');
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
      table: this.tableComponent,
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  formRestore(modalForm: any) {
    const formData = fncFormCollect(modalForm, 'restoreField');
    formData[this.tableSysEliminate] = '1';
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = fncFormCollect(modalForm, 'restoreWhere');
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
    fncInputChange('restore_tb_eliminate', '1');
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
      table: this.tableComponent,
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  formUpdate(modalForm: any) {
    const formData = fncFormCollect(modalForm, 'updateField');
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = fncFormCollect(modalForm, 'updateWhere');
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
      table: this.tableComponent,
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
    this.serviceApi.proccessUpdate(params, jsonData).subscribe({
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
        this.resultColumn(this.deletedData);
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
}
