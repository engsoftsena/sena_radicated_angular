import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// Importacion de Modulos
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { AuthService } from 'src/app/services/functions/auth/auth.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Servicios
// Importacion de Funciones Generales
import { expTableRegister, expTableRemove } from 'src/app/functions/data-table';
import { fncInputChange } from 'src/app/functions/input-html';
import {
  expFormCollect,
  expModalClass,
  expModalClose,
  expModalMapData,
  expModalReset
} from 'src/app/functions/modal-form';
import { expSelectHtmlIds, expSelectHtmlMap } from 'src/app/functions/select-html';
// Importacion de Librerias
import * as $ from 'jquery';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tg-document',
  templateUrl: './tg-document.component.html',
  styleUrls: ['./tg-document.component.scss']
})
export class TgDocumentComponent implements OnInit {
  @ViewChild('tableData') tableData: ElementRef | undefined;

  constructor (
    private serviceApi: ApiService,
    private serviceAuth: AuthService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceTable: TableService,
  ) {}

  syModuleId: number = 0;
  syPrefixId: number = 4;
  tgRoleId: number = 0;

  tgActionRead: any;
  tgActionCreate: any;
  tgActionUpdate: any;
  tgActionRemove: any;
  tgActionDelete: any;
  tgActionChange: any;

  tableComponent: string = 'tg_document';
  tableSysEliminate: string = 'sy_eliminate';
  deletedData: any;
  isLoading: boolean = false;
  columnSet: [] | undefined;
  responseData: [] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.checkEndpoint();
  }

  ngAfterViewInit() {
    this.tableDataValue();
  }

  modalClass() { expModalClass(); }

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
          this.tgRoleData();
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

  tgRoleData() {
    this.serviceAuth.getAuthJwt().subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.syModuleData(response); }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  syModuleData(response: any) {
    if (response.data[0].tg_role) {
      this.tgRoleId = response.data[0].tg_role;
    }
    const params = {
      table: `sy_module`,
      column: `*`,
      whereCond: `WHERE,AND`,
      whereField: `os_table,sy_prefix`,
      whereOperator: `=,=`,
      whereEqual: `document,${this.syPrefixId}`,
    };
    this.serviceApi.infoSelect(params).subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.tgPermitData(response); }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgPermitData(response: any) {
    if (response.data[0].id_register) {
      this.syModuleId = response.data[0].id_register;
    }
    const params = {
      table: `tg_permit`,
      column: `*`,
      whereCond: `WHERE,AND`,
      whereField: `sy_module,tg_role`,
      whereOperator: `=,=`,
      whereEqual: `${this.syModuleId},${this.tgRoleId}`,
    };
    this.serviceApi.innerAlias(params).subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.tgPermitMap(response);}
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgPermitMap(response: any) {
    // Mapea los datos del servicio al formato esperado
    for (let item of response.data) {
      let tgAction = item.lbl_tg_action_os_name;
      let tgAuthorization = item.lbl_tg_authorization_os_state;
      if (tgAction == 'Consultar') { this.tgActionRead = tgAuthorization; }
      if (tgAction == 'Registrar') { this.tgActionCreate = tgAuthorization; }
      if (tgAction == 'Actualizar') { this.tgActionUpdate = tgAuthorization; }
      if (tgAction == 'Remover') { this.tgActionRemove = tgAuthorization; }
      if (tgAction == 'Eliminar') { this.tgActionDelete = tgAuthorization; }
      if (tgAction == 'Cambios') { this.tgActionChange = tgAuthorization; }
    }
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
    this.serviceApi.innerLabel(params).subscribe({
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
    this.serviceApi.innerAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.responseData = response.data;
          console.log(this.responseData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.responseData,
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
        this.responseData = response.data;
        console.log(this.responseData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.responseData,
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
    this.tableDataFilter(this.deletedData, load);
  }

  tableDataFilter(delValue: any, load: boolean = false) {
    if (load) { this.resultColumn(delValue); }
    if (delValue == '1') { expTableRegister(); }
    if (delValue == '2') { expTableRemove(); }
  }

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) { new Modal(modalElement).show(); }
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
          expModalMapData(modalOption, serviceResolve);
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

  selectHtmlModal() {
    const { prefixes, idHtmlValues } = expSelectHtmlIds();
    // Llama a la función con valores reemplazados
    this.selectHtmlSearch(prefixes, idHtmlValues);
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
        expSelectHtmlMap(modalPrefix, params, response);
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

  formDelete(modalForm: any) {
    const whereForm = expFormCollect(modalForm, 'deleteWhere');
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
    const formData = expFormCollect(modalForm, 'insertField');
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
    const formData = expFormCollect(modalForm, 'removeField');
    formData[this.tableSysEliminate] = '2';
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = expFormCollect(modalForm, 'removeWhere');
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
    const formData = expFormCollect(modalForm, 'restoreField');
    formData[this.tableSysEliminate] = '1';
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = expFormCollect(modalForm, 'restoreWhere');
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
    const formData = expFormCollect(modalForm, 'updateField');
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = expFormCollect(modalForm, 'updateWhere');
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
    expModalClose(modalId);
    expModalReset(formId);
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

  async resultRegister(params: any) {
    let message;
    const serviceResolve = await this.serviceApi.resolveRegister(params);
    if (serviceResolve.data && Array.isArray(serviceResolve.data)) {
      const hasErrors = serviceResolve.data.some((item: any) => 'error' in item);
      if (hasErrors) {
        message = 'Ocurrió un error en la solicitud';
        this.modalSystemData(message, serviceResolve);
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
    return serviceResolve;
  }
}
