import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApTraceabilityComponent } from './ap-traceability.component';

describe('ApTraceabilityComponent', () => {
  let component: ApTraceabilityComponent;
  let fixture: ComponentFixture<ApTraceabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApTraceabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApTraceabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
