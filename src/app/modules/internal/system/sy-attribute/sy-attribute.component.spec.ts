import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyAttributeComponent } from './sy-attribute.component';

describe('SyAttributeComponent', () => {
  let component: SyAttributeComponent;
  let fixture: ComponentFixture<SyAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyAttributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
