import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeRestoreComponent } from './ope-restore.component';

describe('OpeRestoreComponent', () => {
  let component: OpeRestoreComponent;
  let fixture: ComponentFixture<OpeRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeRestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
