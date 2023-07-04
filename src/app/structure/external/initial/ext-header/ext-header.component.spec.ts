import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtHeaderComponent } from './ext-header.component';

describe('ExtHeaderComponent', () => {
  let component: ExtHeaderComponent;
  let fixture: ComponentFixture<ExtHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
