import { Component, OnInit } from '@angular/core';
import { CausalModule } from 'src/app/interfaces/modules/causal.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { CausalService } from 'src/app/services/modules/causal/causal.service';
import { TableService } from 'src/app/services/functions/table/table.service';

@Component({
  selector: 'app-causal',
  templateUrl: './causal.component.html',
  styleUrls: ['./causal.component.scss']
})
export class CausalComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceCausal: CausalService,
    private serviceTable: TableService,
  ) {}

  columnSet: [] | undefined;
  causalData: CausalModule[] = [];

  ngOnInit(): void {
    this.getColumn();
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
        this.serviceTable.getTable(
          'tbCausal',
          this.causalData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
