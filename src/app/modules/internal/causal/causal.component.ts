import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { CausalModule } from 'src/app/interfaces/modules/causal.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Servicios
import { CausalService } from 'src/app/services/modules/causal/causal.service';

import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-causal',
  templateUrl: './causal.component.html',
  styleUrls: ['./causal.component.scss']
})
export class CausalComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceTable: TableService,

    private serviceCausal: CausalService,
  ) {}

  isLoading: boolean = false;
  columnSet: [] | undefined;
  causalData: CausalModule[] = [];

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
          message = 'URL API no está disponible';
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
      table: 'causals',
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
      table: 'causals',
      column: '*',
    };
    this.serviceApi.getSelect(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.causalData = response.data;
          console.log(this.causalData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.causalData,
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
      table: 'causals',
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
      table: 'causals',
      column: '*',
    };
    this.serviceApi.getAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
        // Mapea los datos del servicio al formato esperado
          this.causalData = response.data;
          console.log(this.causalData);
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.causalData,
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
      table: 'causals',
      column: '*',
      whereField: data['whereField'],
      whereOperator: data['whereOperator'],
      whereEqual: data['whereEqual'],
    };
    this.serviceApi.getRegister(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.causalData = response.data;
        console.log(this.causalData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.causalData,
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

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) { new Modal(modalElement).show(); }
  }

  modalClose(modalForm: string) {
    // JavaScript para cerrar la ventana modal
    const miModal = document.getElementById(modalForm);
    if (miModal) { miModal.style.display = 'none'; }
    // Busca el elemento con las clases "modal-backdrop fade show"
    const modalBackdrop = document.querySelector('.modal-backdrop.fade.show');
    if (modalBackdrop) { modalBackdrop.classList.remove('modal-backdrop', 'fade', 'show'); }
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
        table: 'causals',
        column: '*',
        whereField: `id_causal`,
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
          this.modalOpen(modalForm);
          this.modalMapData(modalOption, serviceRecord);
        }
      } else {
        message = 'No tiene un formato en array.';
        alert(message);
      }
    } else {
      message = 'No has seleccionado ningún registro.';
      alert(message);
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
    let message = '';
    const form = <HTMLFormElement>document.getElementById('formInsertData');
    const formData: { [key: string]: string } = {};
    const formElementsArray = Array.from(form.elements);
    for (const element of formElementsArray) {
      if (element instanceof HTMLInputElement) {
        const fieldName = element.name.replace('insert_', '');
        formData[fieldName] = element.value;
      }
    }
    // Convierte los datos a JSON usando JSON.stringify
    const jsonData = JSON.stringify(formData);
    const dataColumn = Object.keys(formData).join(',');
    const params = {
      table: 'causals',
      column: dataColumn,
    };
    console.log(formData);
    console.log(jsonData);
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.getInsert(params, jsonData).subscribe({
      next: (response) => {
        // Maneja la respuesta del servidor aquí
        //console.log('Respuesta del servidor:', response);
        this.responseSuccess('modalInsert', response);
      },
      error: (error) => {
        // Maneja los errores aquí
        //console.error('Error al enviar datos:', error);
        message = 'URL API no está disponible';
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  responseSuccess(modalForm: string, response: any) {
    let message;
    if (response.data && Array.isArray(response.data)) {
      const hasVal = response.data.some((item: any) => 'success' in item);
      if (hasVal) {
        this.modalClose(modalForm);
        this.modalReset('formInsertData');
        const answer = response.data
          .filter((item: any) => 'success' in item)
          .map((item: { success: any; }) => item.success)
          .join(', ');
        Swal.fire(
          'Completado!',
          `${answer}`,
          'success',
        ).then(() => {
          this.refreshData();
        });
      } else {
        console.log('error');
      }
    } else {
      message = 'No tiene un formato en array.';
      Swal.fire(
        'Error!',
        `${message}`,
        'error',
      );
    }
  }

  refreshData() {
    let timerInterval: any;

    Swal.fire({
      title: 'Procesando',
      html: 'Espere un momento...',
      timer: 2000, // Cambia este valor al tiempo que desees
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b'); // Comprobación de nulidad

        if (b) {
          const timerLeft = Swal.getTimerLeft();
          if (timerLeft !== undefined) {
            b.textContent = timerLeft.toString();
          }
        }

        const alertBox = Swal.getPopup();
        if (alertBox) {
          alertBox.style.textAlign = 'center';
        }

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
        console.log('La alerta se cerró automáticamente por el temporizador');
        this.getLabel();
      }
    });


  }

  actionRemove() {

  }

  actionRestore() {

  }

  actionUpdate() {

  }
}
