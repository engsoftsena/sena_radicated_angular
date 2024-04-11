import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { IntLogoutComponent } from './int-logout.component';

describe('IntLogoutComponent', () => {
  let component: IntLogoutComponent;
  let fixture: ComponentFixture<IntLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
