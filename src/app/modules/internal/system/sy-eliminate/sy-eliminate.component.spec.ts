import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyEliminateComponent } from './sy-eliminate.component';

describe('SyEliminateComponent', () => {
  let component: SyEliminateComponent;
  let fixture: ComponentFixture<SyEliminateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyEliminateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyEliminateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
