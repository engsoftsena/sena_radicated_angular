import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ext-doctype',
  templateUrl: './ext-doctype.component.html',
  styleUrls: ['./ext-doctype.component.scss']
})
export class ExtDoctypeComponent {
  @Input() styleType: string | undefined;
}
