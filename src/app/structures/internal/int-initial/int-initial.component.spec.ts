import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IntInitialComponent } from './int-initial.component';

describe('IntInitialComponent', () => {
  let component: IntInitialComponent;
  let fixture: ComponentFixture<IntInitialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntInitialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntInitialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
