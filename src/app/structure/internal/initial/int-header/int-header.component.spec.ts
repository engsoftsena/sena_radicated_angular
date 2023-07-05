import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntHeaderComponent } from './int-header.component';

describe('IntHeaderComponent', () => {
  let component: IntHeaderComponent;
  let fixture: ComponentFixture<IntHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
