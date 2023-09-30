import { Component, OnInit } from '@angular/core';
import { ComunicationModule } from 'src/app/interfaces/modules/comunication.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ComunicationService } from 'src/app/services/comunication/comunication.service';
import { TableService } from 'src/app/services/functions/table/table.service';

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
        this.comunicationData = response.result;
        console.log(this.comunicationData);
        const columnSet = [
          {
            title: "Id",
            id: "id_communication",
            data: "id_communication",
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
