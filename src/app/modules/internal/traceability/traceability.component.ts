import { Component, OnInit } from '@angular/core';
import { TraceabilityModule } from 'src/app/models/traceability.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { TableService } from 'src/app/services/table/table.service';
import { TraceabilityService } from 'src/app/services/traceability/traceability.service';

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

  traceabilityData: TraceabilityModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceTraceability.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.traceabilityData = response.result.map((item: any) => ({
          id_role: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.traceabilityData);
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
        this.serviceTable.getTable('tbTraceability', this.traceabilityData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
