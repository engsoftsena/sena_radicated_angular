import { Component, OnInit } from '@angular/core';
import { RoleModule } from 'src/app/models/role.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { RoleService } from 'src/app/services/role/role.service';
import { TableService } from 'src/app/services/table/table.service';

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

  roleData: RoleModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceRole.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.roleData = response.result;
        console.log(this.roleData);
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
        this.serviceTable.getTable('tbRole', this.roleData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
