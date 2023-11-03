import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApUserComponent } from './tg-user.component';

describe('ApUserComponent', () => {
  let component: ApUserComponent;
  let fixture: ComponentFixture<ApUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
