import { Component, OnInit } from '@angular/core';
import { RequestModule } from 'src/app/interfaces/modules/request.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { RequestService } from 'src/app/services/request/request.service';
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

  requestData: RequestModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceRequest.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.requestData = response.result;
        console.log(this.requestData);
        const columnSet = [
          {
            title: "Id",
            id: "id_request",
            data: "id_request",
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
        this.serviceTable.getTable('tbRequest', this.requestData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
