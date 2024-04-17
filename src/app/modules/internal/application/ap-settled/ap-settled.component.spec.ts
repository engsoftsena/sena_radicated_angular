import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApSettledComponent } from './ap-settled.component';

describe('ApSettledComponent', () => {
  let component: ApSettledComponent;
  let fixture: ComponentFixture<ApSettledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApSettledComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApSettledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
