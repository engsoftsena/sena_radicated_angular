import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgDocumentComponent } from './tg-document.component';

describe('TgDocumentComponent', () => {
  let component: TgDocumentComponent;
  let fixture: ComponentFixture<TgDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
