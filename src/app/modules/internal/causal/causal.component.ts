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
      error: (err: any) => console.error(err),
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
      error: (err: any) => console.error(err),
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
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
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
          const modalElement = document.getElementById(modalForm);
          if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
            this.modalMapData(modalOption, serviceRecord);
          }
        }
      } else {
        message = 'No has seleccionado ningún registro.';
        alert(message);
      }
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

  }

  actionRemove() {

  }

  actionRestore() {

  }

  actionUpdate() {

  }
}
