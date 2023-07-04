import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtFooterComponent } from './ext-footer.component';

describe('ExtFooterComponent', () => {
  let component: ExtFooterComponent;
  let fixture: ComponentFixture<ExtFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
