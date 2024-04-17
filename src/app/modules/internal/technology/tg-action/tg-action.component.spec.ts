import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TgActionComponent } from './tg-action.component';

describe('TgActionComponent', () => {
  let component: TgActionComponent;
  let fixture: ComponentFixture<TgActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgActionComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
