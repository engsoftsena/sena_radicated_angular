import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntOptionComponent } from './int-option.component';

describe('IntOptionComponent', () => {
  let component: IntOptionComponent;
  let fixture: ComponentFixture<IntOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
