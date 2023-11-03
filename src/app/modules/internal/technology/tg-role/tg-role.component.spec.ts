import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgRoleComponent } from './tg-role.component';

describe('TgRoleComponent', () => {
  let component: TgRoleComponent;
  let fixture: ComponentFixture<TgRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
