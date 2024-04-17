import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmHostingComponent } from './em-hosting.component';

describe('EmHostingComponent', () => {
  let component: EmHostingComponent;
  let fixture: ComponentFixture<EmHostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmHostingComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmHostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
