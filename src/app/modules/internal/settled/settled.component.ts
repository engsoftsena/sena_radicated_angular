import { Component, OnInit } from '@angular/core';
import { SettledModule } from 'src/app/interfaces/modules/settled.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { SettledService } from 'src/app/services/modules/settled/settled.service';
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

  columnSet: [] | undefined;
  settledData: SettledModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('settleds').subscribe({
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
    this.serviceApi.getSelect('settleds').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.settledData = response.data;
        console.log(this.settledData);
        this.serviceTable.getTable(
          'tbSettled',
          this.settledData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
