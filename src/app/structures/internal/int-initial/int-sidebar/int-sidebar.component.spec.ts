import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntSidebarComponent } from './int-sidebar.component';

describe('IntSidebarComponent', () => {
  let component: IntSidebarComponent;
  let fixture: ComponentFixture<IntSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
