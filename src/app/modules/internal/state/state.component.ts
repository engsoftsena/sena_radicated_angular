import { Component, OnInit } from '@angular/core';
import { StateModule } from 'src/app/interfaces/modules/state.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { StateService } from 'src/app/services/modules/state/state.service';
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

  columnSet: [] | undefined;
  stateData: StateModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('states').subscribe({
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
    this.serviceApi.getSelect('states').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.stateData = response.data;
        console.log(this.stateData);
        this.serviceTable.getTable(
          'tbState',
          this.stateData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
