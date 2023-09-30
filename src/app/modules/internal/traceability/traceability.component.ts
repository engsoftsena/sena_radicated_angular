import { Component, OnInit } from '@angular/core';
import { TraceabilityModule } from 'src/app/interfaces/modules/traceability.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { TableService } from 'src/app/services/functions/table/table.service';
import { TraceabilityService } from 'src/app/services/modules/traceability/traceability.service';

@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.scss']
})
export class TraceabilityComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceTable: TableService,
    private serviceTraceability: TraceabilityService,
  ) {}

  columnSet: [] | undefined;
  traceabilityData: TraceabilityModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('traceabilities').subscribe({
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
    this.serviceApi.getSelect('traceabilities').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.traceabilityData = response.data;
        console.log(this.traceabilityData);
        this.serviceTable.getTable(
          'tbTraceability',
          this.traceabilityData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
