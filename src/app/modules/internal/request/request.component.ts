import { Component, OnInit } from '@angular/core';
import { RequestModule } from 'src/app/interfaces/modules/request.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { RequestService } from 'src/app/services/modules/request/request.service';
import { TableService } from 'src/app/services/functions/table/table.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceRequest: RequestService,
    private serviceTable: TableService,
  ) {}

  columnSet: [] | undefined;
  requestData: RequestModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('requests').subscribe({
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
    this.serviceApi.getSelect('requests').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.requestData = response.data;
        console.log(this.requestData);
        this.serviceTable.getTable(
          'tbRequest',
          this.requestData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
