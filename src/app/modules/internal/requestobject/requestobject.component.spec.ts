import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestobjectComponent } from './requestobject.component';

describe('RequestobjectComponent', () => {
  let component: RequestobjectComponent;
  let fixture: ComponentFixture<RequestobjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestobjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestobjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
