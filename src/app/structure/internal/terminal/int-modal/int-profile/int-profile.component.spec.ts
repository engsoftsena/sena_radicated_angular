import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntProfileComponent } from './int-profile.component';

describe('IntProfileComponent', () => {
  let component: IntProfileComponent;
  let fixture: ComponentFixture<IntProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
