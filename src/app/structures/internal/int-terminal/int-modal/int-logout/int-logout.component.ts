import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { expModalClass } from 'src/app/functions/modal-form';

@Component({
  selector: 'app-int-logout',
  templateUrl: './int-logout.component.html',
  styleUrls: ['./int-logout.component.scss']
})
export class IntLogoutComponent {
  constructor(
    private router: Router,
  ) {}

  modalClass() { expModalClass(); }

  actionLogout() {
    this.modalClass();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['external/login']);
  }
}
