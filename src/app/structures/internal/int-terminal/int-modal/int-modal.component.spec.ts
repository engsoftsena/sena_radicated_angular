import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntModalComponent } from './int-modal.component';

describe('IntModalComponent', () => {
  let component: IntModalComponent;
  let fixture: ComponentFixture<IntModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
