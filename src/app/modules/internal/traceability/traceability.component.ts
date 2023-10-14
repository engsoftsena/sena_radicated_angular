import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { TraceabilityModule } from 'src/app/interfaces/modules/traceability.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { TableService } from 'src/app/services/functions/table/table.service';
import { TraceabilityService } from 'src/app/services/modules/traceability/traceability.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.scss']
})
export class TraceabilityComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceTable: TableService,
    private serviceTraceability: TraceabilityService,
  ) {}

  columnSet: [] | undefined;
  traceabilityData: TraceabilityModule[] = [];

  ngOnInit(): void {
    //this.getColumn();
    this.getLabel();
  }

  getColumn() {
    const params = {
      table: 'traceabilities',
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
      table: 'traceabilities',
      column: '*',
    };
    this.serviceApi.getSelect(params).subscribe({
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
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getLabel() {
    const params = {
      table: 'traceabilities',
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
      table: 'traceabilities',
      column: '*',
    };
    this.serviceApi.getAlias(params).subscribe({
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
