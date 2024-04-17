import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IntModalComponent } from './int-modal.component';

import { IntLogoutComponent } from './int-logout/int-logout.component';
import { IntModuleComponent } from './int-module/int-module.component';
import { IntProfileComponent } from './int-profile/int-profile.component';
import { IntSettingComponent } from './int-setting/int-setting.component';

describe('IntModalComponent', () => {
  let component: IntModalComponent;
  let fixture: ComponentFixture<IntModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IntModalComponent,

        IntLogoutComponent,
        IntModuleComponent,
        IntProfileComponent,
        IntSettingComponent,
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
