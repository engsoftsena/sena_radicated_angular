import { Component, OnInit } from '@angular/core';
import { DocumentModule } from 'src/app/models/document.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { DocumentService } from 'src/app/services/document/document.service';
import { TableService } from 'src/app/services/table/table.service';

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
        this.documentData = response.result.map((item: any) => ({
          id_role: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.documentData);
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
        this.serviceTable.getTable('tbDocument', this.documentData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
