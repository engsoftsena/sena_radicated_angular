import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntDoctypeComponent } from './int-doctype.component';

describe('IntDoctypeComponent', () => {
  let component: IntDoctypeComponent;
  let fixture: ComponentFixture<IntDoctypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntDoctypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntDoctypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
