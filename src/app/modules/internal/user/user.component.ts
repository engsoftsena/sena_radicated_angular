import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/interfaces/modules/user.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { TableService } from 'src/app/services/functions/table/table.service';
import { UserService } from 'src/app/services/modules/user/user.service';

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

  columnSet: [] | undefined;
  userData: UserModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('users').subscribe({
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
    this.serviceApi.getSelect('users').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.userData = response.data;
        console.log(this.userData);
        this.serviceTable.getTable(
          'tbUser',
          this.userData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
