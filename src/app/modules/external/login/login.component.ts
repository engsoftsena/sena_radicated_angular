import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Importacion de Funciones Generales
import { expFormCollect, expModalClass, expModalClose, expModalReset } from 'src/app/functions/modal-form';
// Importacion de Servicios
import { ExternalService } from 'src/app/services/functions/external/external.service';
// Importacion de Librerias
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (
    private router: Router,
    private serviceExternal: ExternalService,
  ) {}

  ngOnInit(): void {
    this.serviceExternal.proccessAuth();
  }

  tableComponent: string = 'tg_user';
  tableSysEliminate: string = 'sy_eliminate';
  isLoading: boolean = false;

  modalClass() { expModalClass(); }

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
  }

  formLogin(modalForm: any) {
    const formData = expFormCollect(modalForm, 'formLoginData');
    formData[this.tableSysEliminate] = '1';
    const dataColumn = Object.keys(formData).join(',');
    return { formData, dataColumn, };
  }

  actionLogin() {
    this.isLoading = true;
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalLogin',
      'formId': 'formLoginData',
      'formAjax': 'formLoginAjax',
      'formPrefix': 'login_',
    };
    // Retornar Informacion
    const { formData, dataColumn, } = this.formLogin(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      table: this.tableComponent,
      column: dataColumn,
    };
    this.sendLogin(modalForm, params, jsonData);
  }

  sendLogin(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceExternal.proccessLogin(params, jsonData).subscribe({
      next: (response) => {
        console.log(response);
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud POST de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  responseMessage(modalForm: any, response: any) {
    const { modalId, formId } = modalForm;
    expModalClose(modalId);
    expModalReset(formId);
    let message;
    if (response.data && Array.isArray(response.data)) {
      const respWarnign = response.data.some((item: any) => 'warning' in item);
      if (respWarnign) { this.responseWarning(modalForm, response); }
      const respError = response.data.some((item: any) => 'error' in item);
      if (respError) { this.getDataError(response); }
      if (!respWarnign && !respError) { this.responseSuccess(modalForm, response); }
      this.isLoading = false;
    } else {
      message = 'Identificamos que la solicitud no tiene un formato correcto';
      this.modalSystemData(message, response);
    }
  }

  responseSuccess(modalForm: any, response: any) {
    const { modalId, formId } = modalForm;
    expModalClose(modalId);
    expModalReset(formId);
    const answer = 'Acceso Autorizado';
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'success',
      title: `<h2>Exito!</h2>`,
    }).then(() => {
      let resDat = response.data;
      let obj = JSON.stringify(resDat);
      // Asignar informacion en almacenamiento
      localStorage.setItem('tgUserData', obj);
      sessionStorage.setItem('tgUserData', obj);
      // Verificar que la informacion es un array
      if (Array.isArray(resDat) && resDat.length > 0) {
        const dataResp = resDat[0];
        // Asignar informacion en almacenamiento
        const idRegister = dataResp.id_register;
        localStorage.setItem('tgUserIdRegister', idRegister);
        sessionStorage.setItem('tgUserIdRegister', idRegister);
        // Asignar informacion en almacenamiento
        const osLogin = dataResp.os_login;
        localStorage.setItem('tgUserOsLogin', osLogin);
        sessionStorage.setItem('tgUserOsLogin', osLogin);
        // Asignar informacion en almacenamiento
        const osNames = dataResp.os_names;
        localStorage.setItem('tgUserOsNames', osNames);
        sessionStorage.setItem('tgUserOsNames', osNames);
        // Asignar informacion en almacenamiento
        const osSurnames = dataResp.os_surnames;
        localStorage.setItem('tgUserOsSurnames', osSurnames);
        sessionStorage.setItem('tgUserOsSurnames', osSurnames);
        // Asignar informacion en almacenamiento
        const tgRole = dataResp.tg_role;
        localStorage.setItem('tgUserTgRole', tgRole);
        sessionStorage.setItem('tgUserTgRole', tgRole);
      }
      this.router.navigate(['/internal/dashboard']);
    });
  }

  responseWarning(modalForm: any, response: any) {
    const { modalId, formId } = modalForm;
    expModalClose(modalId);
    expModalReset(formId);
    const answer = response.data
      .filter((item: any) => 'warning' in item)
      .map((item: { warning: any; }) => item.warning)
      .join(', ');
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'warning',
      title: `<h2>Advertencia!</h2>`,
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
}
