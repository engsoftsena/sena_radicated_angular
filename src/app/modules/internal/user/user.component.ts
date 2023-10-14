import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { UserModule } from 'src/app/interfaces/modules/user.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { TableService } from 'src/app/services/functions/table/table.service';
import { UserService } from 'src/app/services/modules/user/user.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceTable: TableService,
    private serviceUser: UserService,
  ) {}

  columnSet: [] | undefined;
  userData: UserModule[] = [];

  ngOnInit(): void {
    //this.getColumn();
    this.getLabel();
  }

  getColumn() {
    this.serviceApi.getColumn('users', '*').subscribe({
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
    this.serviceApi.getSelect('users', '*').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.userData = response.data;
        // Concatenar los botones en un solo arreglo
        const btnGroups = [
          ...this.serviceButton.buttonDataAction(),
          ...this.serviceButton.buttonDataExport(),
          ...this.serviceButton.buttonFielAction(),
        ];
        // Construir tabla con datos y botones
        console.log(this.userData);
        this.serviceTable.getTable(
          'tbInfo',
          this.userData,
          this.columnSet,
          //btnGroups
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getLabel() {
    this.serviceApi.getLabel('users', '*').subscribe({
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
    this.serviceApi.getAlias('users', '*').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.userData = response.data;
        // Concatenar los botones en un solo arreglo
        const btnGroups = [
          ...this.serviceButton.buttonDataAction(),
          ...this.serviceButton.buttonDataExport(),
          ...this.serviceButton.buttonFielAction(),
        ];
        // Construir tabla con datos y botones
        console.log(this.userData);
        this.serviceTable.getTable(
          'tbInfo',
          this.userData,
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
