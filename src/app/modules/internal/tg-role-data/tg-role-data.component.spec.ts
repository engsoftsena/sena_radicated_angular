import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgRoleDataComponent } from './tg-role-data.component';

describe('TgRoleDataComponent', () => {
  let component: TgRoleDataComponent;
  let fixture: ComponentFixture<TgRoleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgRoleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgRoleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
