import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtDoctypeComponent } from './ext-doctype.component';

describe('ExtDoctypeComponent', () => {
  let component: ExtDoctypeComponent;
  let fixture: ComponentFixture<ExtDoctypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtDoctypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtDoctypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
