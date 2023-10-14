import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { PatientModule } from 'src/app/interfaces/modules/patient.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { PatientService } from 'src/app/services/modules/patient/patient.service';
import { TableService } from 'src/app/services/functions/table/table.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceTable: TableService,
    private servicePatient: PatientService,
  ) {}

  columnSet: [] | undefined;
  patientData: PatientModule[] = [];

  ngOnInit(): void {
    //this.getColumn();
    this.getLabel();
  }

  getColumn() {
    const params = {
      table: 'patients',
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
      table: 'patients',
      column: '*',
    };
    this.serviceApi.getSelect(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.patientData = response.data;
        console.log(this.patientData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.patientData,
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
      table: 'patients',
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
      table: 'patients',
      column: '*',
    };
    this.serviceApi.getAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.patientData = response.data;
        console.log(this.patientData);
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.patientData,
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
