import { Component, OnInit } from '@angular/core';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
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
    private serviceEndpoint: EndpointService,
  ) {}

  tableComponent: string = 'tg_permit';
  tableSysEliminate: string = 'sy_eliminate';
  tgUserTgRole: any;

  ngOnInit(): void {
    //this.sessionStorage();
    this.checkEndpoint();
  }

  modalClass() { expModalClass(); }

  sessionStorage() {
    this.tgUserTgRole = sessionStorage.getItem('tgUserTgRole');
    console.log(this.tgUserTgRole);
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
          this.resultData();
          //this.selectHtmlModal();
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

  resultData() {
    const params = {
      table: this.tableComponent,
      column: '*',
      whereCond: 'WHERE,AND,AND',
      whereField: 'tg_action,tg_authorization,tg_role',
      whereOperator: '=,=,=',
      whereEqual: `1,1,${this.tgUserTgRole}`,
    };
    this.serviceApi.innerAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        //this.columnSet = response;
        //this.resultData(fieldDeleted);
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
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
  }
}
