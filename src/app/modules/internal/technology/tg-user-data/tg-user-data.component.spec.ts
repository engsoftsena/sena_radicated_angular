import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgUserDataComponent } from './tg-user-data.component';

describe('TgUserDataComponent', () => {
  let component: TgUserDataComponent;
  let fixture: ComponentFixture<TgUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgUserDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
