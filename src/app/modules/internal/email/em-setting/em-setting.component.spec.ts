import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmSettingComponent } from './em-setting.component';

describe('EmSettingComponent', () => {
  let component: EmSettingComponent;
  let fixture: ComponentFixture<EmSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
