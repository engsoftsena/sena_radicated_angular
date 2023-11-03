import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApRequestComponent } from './ap-request.component';

describe('ApRequestComponent', () => {
  let component: ApRequestComponent;
  let fixture: ComponentFixture<ApRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
