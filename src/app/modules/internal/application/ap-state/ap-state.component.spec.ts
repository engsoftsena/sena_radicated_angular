import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApStateComponent } from './ap-state.component';

describe('ApStateComponent', () => {
  let component: ApStateComponent;
  let fixture: ComponentFixture<ApStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
