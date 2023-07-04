import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtScriptsComponent } from './ext-scripts.component';

describe('ExtScriptsComponent', () => {
  let component: ExtScriptsComponent;
  let fixture: ComponentFixture<ExtScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtScriptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
