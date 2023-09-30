import { Component, OnInit } from '@angular/core';
import { RoleModule } from 'src/app/interfaces/modules/role.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { RoleService } from 'src/app/services/role/role.service';
import { TableService } from 'src/app/services/functions/table/table.service';

declare let $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceRole: RoleService,
    private serviceTable: TableService,
  ) {}

  columnSet: [] | undefined;
  roleData: RoleModule[] = [];

  ngOnInit(): void {
    this.getColumn();
    this.getSelect();
  }

  getColumn() {
    this.serviceApi.getColumn('roles').subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getSelect() {
    this.serviceApi.getSelect('roles').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.roleData = response.data;
        console.log(this.roleData);
        this.serviceTable.getTable(
          'tbRole',
          this.roleData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
