import { Component, OnInit } from '@angular/core';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { AuthService } from 'src/app/services/functions/auth/auth.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
// Importacion de Interfaces
import { InterfaceModule } from 'src/app/interfaces/general/module.interface';
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

@Component({
  selector: 'app-int-sidebar',
  templateUrl: './int-sidebar.component.html',
  styleUrls: ['./int-sidebar.component.scss']
})
export class IntSidebarComponent implements OnInit {
  AppCompTitle = 'APP PQRS';

  constructor (
    private serviceApi: ApiService,
    private serviceAuth: AuthService,
    private serviceEndpoint: EndpointService,
  ) {}

  syPrefixSy: any;
  syPrefixUs: any;
  syPrefixEm: any;
  syPrefixTg: any;
  syPrefixAp: any;

  tgRoleId: number = 0;

  tableComponent: string = 'tg_permit';
  tableSysEliminate: string = 'sy_eliminate';
  isLoading: boolean = false;
  responseData: InterfaceModule[] = [];

  ngOnInit(): void {
    //this.sessionStorage();
    this.checkEndpoint();
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
        if (checkDataError) {
          this.tgRoleMap(response);
          this.tgPermitModuleData();
          this.tgPermitMenuData();
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgRoleMap(response: any) {
    if (response.data.length > 0) {
      const data = response.data[0];
      this.tgRoleId = data?.tg_role || this.tgRoleId;
    }
  }

  tgPermitModuleData() {
    const params = {
      whereEqual: `${this.tgRoleId}`,
    };
    this.serviceApi.unionModule(params).subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.tgPermitModuleMap(response); }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgPermitMenuData() {
    const params = {
      whereEqual: `${this.tgRoleId}`,
    };
    this.serviceApi.unionMenu(params).subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.tgPermitMenuMap(response); }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgPermitModuleMap(response: any) {
    // Mapea los datos del servicio al formato esperado
    for (let item of response.data) {
      let idRegister = item.mo_sy_prefix_id_register;
      let osModule = item.mo_sy_prefix_os_module;
      if (idRegister == '1') { this.syPrefixSy = osModule; }
      if (idRegister == '2') { this.syPrefixUs = osModule; }
      if (idRegister == '3') { this.syPrefixEm = osModule; }
      if (idRegister == '4') { this.syPrefixTg = osModule; }
      if (idRegister == '5') { this.syPrefixAp = osModule; }
    }
  }

  tgPermitMenuMap(response: any) {
    this.responseData = response.data;
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
}
