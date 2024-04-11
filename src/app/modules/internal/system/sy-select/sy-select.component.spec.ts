import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SySelectComponent } from './sy-select.component';

describe('SySelectComponent', () => {
  let component: SySelectComponent;
  let fixture: ComponentFixture<SySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SySelectComponent ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
