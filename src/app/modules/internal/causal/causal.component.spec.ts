import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausalComponent } from './causal.component';

describe('CausalComponent', () => {
  let component: CausalComponent;
  let fixture: ComponentFixture<CausalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CausalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CausalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
