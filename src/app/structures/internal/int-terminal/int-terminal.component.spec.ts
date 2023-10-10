import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntTerminalComponent } from './int-terminal.component';

describe('IntTerminalComponent', () => {
  let component: IntTerminalComponent;
  let fixture: ComponentFixture<IntTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntTerminalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
