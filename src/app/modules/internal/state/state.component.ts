import { Component, OnInit } from '@angular/core';
import { StateModule } from 'src/app/interfaces/modules/state.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { TableService } from 'src/app/services/functions/table/table.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceState: StateService,
    private serviceTable: TableService,
  ) {}

  stateData: StateModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceState.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.stateData = response.result;
        console.log(this.stateData);
        const columnSet = [
          {
            title: "Id",
            id: "id_state",
            data: "id_state",
            type: "text",
            className: "text-dark",
            visible: true,
          },
          {
            title: "Nombre",
            id: "name",
            data: "name",
            type: "text",
            className: "text-dark",
            visible: true,
          },
        ];
        this.serviceTable.getTable('tbState', this.stateData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
