import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { ResourceModule } from 'src/app/interfaces/modules/resource.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { ResourceService } from 'src/app/services/modules/resource/resource.service';
import { TableService } from 'src/app/services/functions/table/table.service';

import * as $ from 'jquery';
import 'bootstrap';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceButton: ButtonService,
    private serviceTable: TableService,
    private serviceResource: ResourceService,
  ) {}

  columnSet: [] | undefined;
  resourceData: ResourceModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('resources').subscribe({
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
    this.serviceApi.getSelect('resources').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.resourceData = response.data;
        console.log(this.resourceData);
        // Concatenar los botones en un solo arreglo
        const btnGroups = [
          ...this.serviceButton.buttonDataAction(),
          ...this.serviceButton.buttonDataExport(),
          ...this.serviceButton.buttonFielAction(),
        ];
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbResource',
          this.resourceData,
          this.columnSet,
          btnGroups
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
