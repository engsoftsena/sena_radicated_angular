import { Component, OnInit } from '@angular/core';
import { ResourceModule } from 'src/app/interfaces/modules/resource.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ResourceService } from 'src/app/services/modules/resource/resource.service';
import { TableService } from 'src/app/services/functions/table/table.service';

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

  columnSet: [] | undefined;
  resourceData: ResourceModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('resources').subscribe({
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
    this.serviceApi.getSelect('resources').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.resourceData = response.data;
        console.log(this.resourceData);
        this.serviceTable.getTable(
          'tbResource',
          this.resourceData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
