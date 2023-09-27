import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacomunicationComponent } from './mediacomunication.component';

describe('MediacomunicationComponent', () => {
  let component: MediacomunicationComponent;
  let fixture: ComponentFixture<MediacomunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediacomunicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediacomunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
