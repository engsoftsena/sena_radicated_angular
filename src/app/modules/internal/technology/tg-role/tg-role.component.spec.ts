import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApRoleComponent } from './tg-role.component';

describe('ApRoleComponent', () => {
  let component: ApRoleComponent;
  let fixture: ComponentFixture<ApRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
