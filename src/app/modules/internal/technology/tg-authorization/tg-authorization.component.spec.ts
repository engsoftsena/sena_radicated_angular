import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgAuthorizationComponent } from './tg-authorization.component';

describe('TgAuthorizationComponent', () => {
  let component: TgAuthorizationComponent;
  let fixture: ComponentFixture<TgAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
