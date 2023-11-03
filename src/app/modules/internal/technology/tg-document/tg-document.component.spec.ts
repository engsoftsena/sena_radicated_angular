import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApDocumentComponent } from './tg-document.component';

describe('ApDocumentComponent', () => {
  let component: ApDocumentComponent;
  let fixture: ComponentFixture<ApDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
