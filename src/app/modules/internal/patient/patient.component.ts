import { Component, OnInit } from '@angular/core';
import { PatientModule } from 'src/app/interfaces/modules/patient.interface';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { PatientService } from 'src/app/services/modules/patient/patient.service';
import { TableService } from 'src/app/services/functions/table/table.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private servicePatient: PatientService,
    private serviceTable: TableService,
  ) {}

  patientData: PatientModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.servicePatient.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.patientData = response.result;
        console.log(this.patientData);
        const columnSet = [
          {
            title: "Id",
            id: "id_patient",
            data: "id_patient",
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
        this.serviceTable.getTable('tbPatient', this.patientData, columnSet, []);
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
