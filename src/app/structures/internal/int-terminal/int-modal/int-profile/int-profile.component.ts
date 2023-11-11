import { Component } from '@angular/core';
import { expModalClass } from 'src/app/functions/modal-form';

@Component({
  selector: 'app-int-profile',
  templateUrl: './int-profile.component.html',
  styleUrls: ['./int-profile.component.scss']
})
export class IntProfileComponent {

  modalClass() { expModalClass(); }
}
