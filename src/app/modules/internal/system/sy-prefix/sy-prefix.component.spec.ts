import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyPrefixComponent } from './sy-prefix.component';

describe('SyPrefixComponent', () => {
  let component: SyPrefixComponent;
  let fixture: ComponentFixture<SyPrefixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyPrefixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyPrefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
