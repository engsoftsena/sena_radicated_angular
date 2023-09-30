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

  causalData: CausalModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceCausal.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.causalData = response.result;
        console.log(this.causalData);
        const columnSet = [
          {
            title: "Id",
            id: "id_causal",
            data: "id_causal",
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
        this.serviceTable.getTable('tbCausal', this.causalData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
