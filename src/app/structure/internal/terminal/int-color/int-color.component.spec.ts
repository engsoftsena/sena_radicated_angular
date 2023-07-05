import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntColorComponent } from './int-color.component';

describe('IntColorComponent', () => {
  let component: IntColorComponent;
  let fixture: ComponentFixture<IntColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
