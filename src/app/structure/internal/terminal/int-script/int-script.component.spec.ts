import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntScriptComponent } from './int-script.component';

describe('IntScriptComponent', () => {
  let component: IntScriptComponent;
  let fixture: ComponentFixture<IntScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntScriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
