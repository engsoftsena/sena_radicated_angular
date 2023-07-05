import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntTransparentComponent } from './int-transparent.component';

describe('IntTransparentComponent', () => {
  let component: IntTransparentComponent;
  let fixture: ComponentFixture<IntTransparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntTransparentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
