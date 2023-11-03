import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyModuleComponent } from './sy-module.component';

describe('SyModuleComponent', () => {
  let component: SyModuleComponent;
  let fixture: ComponentFixture<SyModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
