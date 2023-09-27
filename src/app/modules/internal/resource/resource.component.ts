import { Component, OnInit } from '@angular/core';
import { ResourceModule } from 'src/app/models/resource.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { TableService } from 'src/app/services/table/table.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceResource: ResourceService,
    private serviceTable: TableService,
  ) {}

  resourceData: ResourceModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceResource.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.resourceData = response.result;
        console.log(this.resourceData);
        const columnSet = [
          {
            title: "Id",
            id: "id_resource",
            data: "id_resource",
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
        this.serviceTable.getTable('tbResource', this.resourceData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
