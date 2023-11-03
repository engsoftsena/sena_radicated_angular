import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApCommunicationComponent } from './ap-communication.component';

describe('ApCommunicationComponent', () => {
  let component: ApCommunicationComponent;
  let fixture: ComponentFixture<ApCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApCommunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
