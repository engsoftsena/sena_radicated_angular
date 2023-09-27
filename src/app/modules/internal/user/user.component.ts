import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor (
    private serviceUser: UserService
  ) {}

  users: UserModule[] = [];

  ngOnInit(): void {
      this.getSelect();
  }

  getSelect() {
    this.serviceUser.getSelect().subscribe({
      next: (data: any) => {
        console.log(data);
        this.users = data;
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getTable() {
    
  }
}
