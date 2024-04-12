import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { InternalComponent } from './internal.component';

import { IntHeaderComponent } from 'src/app/structures/internal/int-initial/int-header/int-header.component';
import { IntOptionComponent } from 'src/app/structures/internal/int-initial/int-option/int-option.component';
import { IntSidebarComponent } from 'src/app/structures/internal/int-initial/int-sidebar/int-sidebar.component';

import { IntFooterComponent } from 'src/app/structures/internal/int-terminal/int-footer/int-footer.component';
import { IntColorComponent } from 'src/app/structures/internal/int-terminal/int-color/int-color.component';
import { IntModalComponent } from 'src/app/structures/internal/int-terminal/int-modal/int-modal.component';

describe('InternalComponent', () => {
  let component: InternalComponent;
  let fixture: ComponentFixture<InternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InternalComponent,

        IntHeaderComponent,
        IntOptionComponent,
        IntSidebarComponent,

        IntColorComponent,
        IntFooterComponent,
        IntModalComponent,
      ],
      imports: [ HttpClientModule, RouterTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
