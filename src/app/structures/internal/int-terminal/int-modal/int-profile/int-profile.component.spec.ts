import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IntProfileComponent } from './int-profile.component';

describe('IntProfileComponent', () => {
  let component: IntProfileComponent;
  let fixture: ComponentFixture<IntProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntProfileComponent ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
