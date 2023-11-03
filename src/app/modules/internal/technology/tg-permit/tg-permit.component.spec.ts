import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgPermitComponent } from './tg-permit.component';

describe('TgPermitComponent', () => {
  let component: TgPermitComponent;
  let fixture: ComponentFixture<TgPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgPermitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
