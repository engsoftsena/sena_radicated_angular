import { Component, OnInit } from '@angular/core';
import { ComunicationModule } from 'src/app/interfaces/modules/comunication.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ComunicationService } from 'src/app/services/modules/comunication/comunication.service';
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

  columnSet: [] | undefined;
  comunicationData: ComunicationModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('comunications').subscribe({
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
    this.serviceApi.getSelect('comunications').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.comunicationData = response.data;
        console.log(this.comunicationData);
        this.serviceTable.getTable(
          'tbComunication',
          this.comunicationData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
