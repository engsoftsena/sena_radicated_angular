import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsPasswordComponent } from './us-password.component';

describe('UsPasswordComponent', () => {
  let component: UsPasswordComponent;
  let fixture: ComponentFixture<UsPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
