import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { CausalModule } from 'src/app/interfaces/modules/causal.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { CausalService } from 'src/app/services/modules/causal/causal.service';
import { TableService } from 'src/app/services/functions/table/table.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-causal',
  templateUrl: './causal.component.html',
  styleUrls: ['./causal.component.scss']
})
export class CausalComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceCausal: CausalService,
    private serviceTable: TableService,
  ) {}

  columnSet: [] | undefined;
  causalData: CausalModule[] = [];

  ngOnInit(): void {
    //this.getColumn();
    this.getLabel();
  }

  getColumn() {
    this.serviceApi.getColumn('causals', '*').subscribe({
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
    this.serviceApi.getSelect('causals', '*').subscribe({
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
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getLabel() {
    this.serviceApi.getLabel('causals', '*').subscribe({
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
    this.serviceApi.getAlias('causals', '*').subscribe({
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
