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

  columnSet: [] | undefined;
  patientData: PatientModule[] = [];

  ngOnInit(): void {
    this.getColumn();
  }

  getColumn() {
    this.serviceApi.getColumn('patients').subscribe({
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
    this.serviceApi.getSelect('patients').subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.patientData = response.data;
        console.log(this.patientData);
        this.serviceTable.getTable(
          'tbPatient',
          this.patientData,
          this.columnSet,
          []
        );
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }
}
