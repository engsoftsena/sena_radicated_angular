import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntModuleComponent } from './int-module.component';

describe('IntModuleComponent', () => {
  let component: IntModuleComponent;
  let fixture: ComponentFixture<IntModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
