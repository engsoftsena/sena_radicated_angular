import { Component, OnInit } from '@angular/core';
import { DocumentModule } from 'src/app/interfaces/modules/document.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { DocumentService } from 'src/app/services/modules/document/document.service';
import { TableService } from 'src/app/services/functions/table/table.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceDocument: DocumentService,
    private serviceTable: TableService,
  ) {}

  columnSet: [] | undefined;
  documentData: DocumentModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('documents').subscribe({
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
    this.serviceApi.getSelect('documents').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.documentData = response.data;
        console.log(this.documentData);
        this.serviceTable.getTable(
          'tbDocument',
          this.documentData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
