import { Component, OnInit } from '@angular/core';
import { SettledModule } from 'src/app/models/settled.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { SettledService } from 'src/app/services/settled/settled.service';
import { TableService } from 'src/app/services/table/table.service';

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
        this.settledData = response.result.map((item: any) => ({
          id_role: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.settledData);
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
        this.serviceTable.getTable('tbSettled', this.settledData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
