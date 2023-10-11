import { Component, OnInit } from '@angular/core';
// Importacion de Modulos
import { CausalModule } from 'src/app/interfaces/modules/causal.interface';
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { CausalService } from 'src/app/services/modules/causal/causal.service';
import { TableService } from 'src/app/services/functions/table/table.service';

//import * as $ from 'jquery';
//import 'bootstrap';

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
    this.getColumn();

    // Suscribirse al evento para abrir el modal
    this.serviceButton.openModalEvent.subscribe(() => {
      this.openModalInsert();
    });
  }

  getColumn() {
    this.serviceApi.getColumn('causals').subscribe({
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
    this.serviceApi.getSelect('causals').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.causalData = response.data;
        console.log(this.causalData);
        // Concatenar los botones en un solo arreglo
        const btnGroups = [
          ...this.serviceButton.buttonDataAction(),
          ...this.serviceButton.buttonDataExport(),
          ...this.serviceButton.buttonFielAction(),
        ];
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbCausal',
          this.causalData,
          this.columnSet,
          btnGroups
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  openModalInsert() {
    const insertNameInput = document.getElementById('insert_name') as HTMLInputElement;
    if (insertNameInput) {
      insertNameInput.value = '1';
    }
  }
}
