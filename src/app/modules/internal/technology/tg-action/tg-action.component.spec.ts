import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TgActionComponent } from './tg-action.component';

describe('TgActionComponent', () => {
  let component: TgActionComponent;
  let fixture: ComponentFixture<TgActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgActionComponent ],
      imports: [ HttpClientModule ],
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
