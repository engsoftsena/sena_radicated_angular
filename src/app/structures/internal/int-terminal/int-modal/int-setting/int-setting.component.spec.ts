import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntSettingComponent } from './int-setting.component';

describe('IntSettingComponent', () => {
  let component: IntSettingComponent;
  let fixture: ComponentFixture<IntSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
