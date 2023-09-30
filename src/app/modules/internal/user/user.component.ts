import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/interfaces/modules/user.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { TableService } from 'src/app/services/functions/table/table.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceTable: TableService,
    private serviceUser: UserService,
  ) {}

  userData: UserModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceUser.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.userData = response.result;
        console.log(this.userData);
        const columnSet = [
          {
            title: "Id",
            id: "id_user",
            data: "id_user",
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
        this.serviceTable.getTable('tbUser', this.userData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
