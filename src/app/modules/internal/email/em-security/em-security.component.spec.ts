import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmSecurityComponent } from './em-security.component';

describe('EmSecurityComponent', () => {
  let component: EmSecurityComponent;
  let fixture: ComponentFixture<EmSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
