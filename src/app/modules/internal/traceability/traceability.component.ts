import { Component, OnInit } from '@angular/core';
import { TraceabilityModule } from 'src/app/models/traceability.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { TraceabilityService } from 'src/app/services/traceability/traceability.service';

@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.scss']
})
export class TraceabilityComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
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
          idRole: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.traceabilityData);
        this.getTable();
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getTable() {
    
  }
}
