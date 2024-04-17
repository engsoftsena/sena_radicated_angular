import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TgUserComponent } from './tg-user.component';

describe('TgUserComponent', () => {
  let component: TgUserComponent;
  let fixture: ComponentFixture<TgUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgUserComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
