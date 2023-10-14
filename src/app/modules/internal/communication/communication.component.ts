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
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('communications').subscribe({
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
    this.serviceApi.getSelect('communications').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.communicationData = response.data;
        console.log(this.communicationData);
        // Concatenar los botones en un solo arreglo
        const btnGroups = [
          ...this.serviceButton.buttonDataAction(),
          ...this.serviceButton.buttonDataExport(),
          ...this.serviceButton.buttonFielAction(),
        ];
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbCommunication',
          this.communicationData,
          this.columnSet,
          //btnGroups
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
    const modalElement = document.getElementById(modalData);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  modalInsert() {

  }

  modalRemove() {

  }

  modalRestore() {

  }

  modalUpdate() {

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
