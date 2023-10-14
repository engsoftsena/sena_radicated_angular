import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { StateModule } from 'src/app/interfaces/modules/state.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { StateService } from 'src/app/services/modules/state/state.service';
import { TableService } from 'src/app/services/functions/table/table.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceTable: TableService,
    private serviceState: StateService,
  ) {}

  columnSet: [] | undefined;
  stateData: StateModule[] = [];

  ngOnInit(): void {
    //this.getColumn();
    this.getLabel();
  }

  getColumn() {
    this.serviceApi.getColumn('states', '*').subscribe({
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
    this.serviceApi.getSelect('states', '*').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.stateData = response.data;
        console.log(this.stateData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.stateData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getLabel() {
    this.serviceApi.getLabel('states', '*').subscribe({
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
    this.serviceApi.getAlias('states', '*').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.stateData = response.data;
        console.log(this.stateData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.stateData,
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
