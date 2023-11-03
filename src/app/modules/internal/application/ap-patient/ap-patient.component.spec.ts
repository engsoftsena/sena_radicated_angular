import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApPatientComponent } from './ap-patient.component';

describe('ApPatientComponent', () => {
  let component: ApPatientComponent;
  let fixture: ComponentFixture<ApPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
