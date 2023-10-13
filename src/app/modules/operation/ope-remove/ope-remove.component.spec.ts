import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeRemoveComponent } from './ope-remove.component';

describe('OpeRemoveComponent', () => {
  let component: OpeRemoveComponent;
  let fixture: ComponentFixture<OpeRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
