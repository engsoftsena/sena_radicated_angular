import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsProccessComponent } from './us-proccess.component';

describe('UsProccessComponent', () => {
  let component: UsProccessComponent;
  let fixture: ComponentFixture<UsProccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsProccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsProccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
