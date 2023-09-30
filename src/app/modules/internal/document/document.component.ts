import { Component, OnInit } from '@angular/core';
import { DocumentModule } from 'src/app/interfaces/modules/document.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { DocumentService } from 'src/app/services/document/document.service';
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

  documentData: DocumentModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceDocument.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.documentData = response.result;
        console.log(this.documentData);
        const columnSet = [
          {
            title: "Id",
            id: "id_document",
            data: "id_document",
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
        this.serviceTable.getTable('tbDocument', this.documentData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
