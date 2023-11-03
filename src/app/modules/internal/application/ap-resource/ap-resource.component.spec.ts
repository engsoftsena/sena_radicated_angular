import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApResourceComponent } from './ap-resource.component';

describe('ApResourceComponent', () => {
  let component: ApResourceComponent;
  let fixture: ComponentFixture<ApResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
