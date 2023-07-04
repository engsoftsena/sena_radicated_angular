import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-int-doctype',
  templateUrl: './int-doctype.component.html',
  styleUrls: ['./int-doctype.component.scss']
})
export class IntDoctypeComponent {
  @Input() styleType: string | undefined;
}
