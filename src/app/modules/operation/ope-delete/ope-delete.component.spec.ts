import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeDeleteComponent } from './ope-delete.component';

describe('OpeDeleteComponent', () => {
  let component: OpeDeleteComponent;
  let fixture: ComponentFixture<OpeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
