import { Component, OnInit } from '@angular/core';
import { StateModule } from 'src/app/models/state.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { StateService } from 'src/app/services/state/state.service';
import { TableService } from 'src/app/services/table/table.service';

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
        this.stateData = response.result.map((item: any) => ({
          id_role: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.stateData);
        const columnSet = [
          {
            title: "Id",
            id: "id_role",
            data: "id_role",
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
