import { Component, OnInit } from '@angular/core';
import { SettledModule } from 'src/app/interfaces/modules/settled.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { SettledService } from 'src/app/services/settled/settled.service';
import { TableService } from 'src/app/services/functions/table/table.service';

@Component({
  selector: 'app-settled',
  templateUrl: './settled.component.html',
  styleUrls: ['./settled.component.scss']
})
export class SettledComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceSettled: SettledService,
    private serviceTable: TableService,
  ) {}

  settledData: SettledModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceSettled.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.settledData = response.result;
        console.log(this.settledData);
        const columnSet = [
          {
            title: "Id",
            id: "id_settled",
            data: "id_settled",
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
        this.serviceTable.getTable('tbSettled', this.settledData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
