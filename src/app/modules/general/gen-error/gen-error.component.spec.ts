import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenErrorComponent } from './gen-error.component';

describe('GenErrorComponent', () => {
  let component: GenErrorComponent;
  let fixture: ComponentFixture<GenErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
