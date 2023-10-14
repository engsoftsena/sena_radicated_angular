import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { CommunicationModule } from 'src/app/interfaces/modules/communication.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { CommunicationService } from 'src/app/services/modules/communication/communication.service';
import { TableService } from 'src/app/services/functions/table/table.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})
export class CommunicationComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceTable: TableService,
    private serviceCommunication: CommunicationService,
  ) {}

  columnSet: [] | undefined;
  communicationData: CommunicationModule[] = [];

  ngOnInit(): void {
    //this.getColumn();
    this.getLabel();
  }

  getColumn() {
    const params = {
      table: 'communications',
      column: '*',
    };
    this.serviceApi.getColumn(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.getSelect();
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getSelect() {
    const params = {
      table: 'communications',
      column: '*',
    };
    this.serviceApi.getSelect(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.communicationData = response.data;
        console.log(this.communicationData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.communicationData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getLabel() {
    const params = {
      table: 'communications',
      column: '*',
    };
    this.serviceApi.getLabel(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.getAlias();
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getAlias() {
    const params = {
      table: 'communications',
      column: '*',
    };
    this.serviceApi.getAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.communicationData = response.data;
        console.log(this.communicationData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.communicationData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  modalOpen(modalData: string) {
    const modalElement = document.getElementById(modalData);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  modalRecord(modalData: string) {
    let message;
    // Obtener el primer valor seleccionado de la tabla
    let idtbl = $('#tbInfo tr.selected td:first').html();
    // Validar si el id es mayor a cero
    if (Number(idtbl) > 0) {
      //  $('#modal-id-delete').modal('show');
      //  document.querySelector('#field_id_delete').value = idtbl;
      const modalElement = document.getElementById(modalData);
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
      }
    } else {
      message = 'No has seleccionado ningun registro.';
      alert(message);
      /*messageBootboxAlert(
        message,
        'small',
        'Advertencia',
        'far fa-times-circle',
        'warning'
      );*/
    }
    
  }

  modalInsert() {

  }

  modalRemove() {

  }

  modalRestore() {

  }

  modalUpdate() {
    let message;
    // Obtener el primer valor seleccionado de la tabla
    let idtbl = $('#tbInfo tr.selected td:first').html();
    // Validar si el id es mayor a cero
    if (Number(idtbl) > 0) {
      const modalElement = document.getElementById('modalUpdate');
      if (modalElement) {
        const modal = new Modal(modalElement);
        modal.show();
        // Obtener el elemento de formulario por su ID
        const updateId = document.querySelector('#update_id_communication') as HTMLInputElement;
        if (updateId) { updateId.value = idtbl; }
      }
    } else {
      message = 'No has seleccionado ningun registro.';
      alert(message);
      /*messageBootboxAlert(
        message,
        'small',
        'Advertencia',
        'far fa-times-circle',
        'warning'
      );*/
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
