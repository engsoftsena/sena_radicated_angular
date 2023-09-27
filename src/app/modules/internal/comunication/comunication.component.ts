import { Component, OnInit } from '@angular/core';
import { ComunicationModule } from 'src/app/models/comunication.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ComunicationService } from 'src/app/services/comunication/comunication.service';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-comunication',
  templateUrl: './comunication.component.html',
  styleUrls: ['./comunication.component.scss']
})
export class ComunicationComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceComunication: ComunicationService,
    private serviceTable: TableService,
  ) {}

  comunicationData: ComunicationModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceComunication.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.comunicationData = response.result.map((item: any) => ({
          id_role: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.comunicationData);
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
        this.serviceTable.getTable('tbComunication', this.comunicationData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
