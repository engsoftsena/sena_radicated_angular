import { Component, OnInit } from '@angular/core';
import { PatientModule } from 'src/app/models/patient.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private servicePatient: PatientService,
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
        this.patientData = response.result.map((item: any) => ({
          idRole: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.patientData);
        this.getTable();
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getTable() {
    
  }
}
