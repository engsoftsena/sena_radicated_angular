import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/models/user.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
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
        this.userData = response.result.map((item: any) => ({
          idRole: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.userData);
        this.getTable();
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getTable() {
    
  }
}
