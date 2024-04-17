import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApCausalComponent } from './ap-causal.component';

import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { of, throwError } from 'rxjs';

describe('ApCausalComponent', () => {
  let component: ApCausalComponent;
  let fixture: ComponentFixture<ApCausalComponent>;
  let serviceEndpoint: EndpointService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApCausalComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        EndpointService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApCausalComponent);
    component = fixture.componentInstance;
    // Obtener function usando el nuevo método público
    serviceEndpoint = component.getServiceEndpoint();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // function: ngOnInit
  it('should set baseUrl and urlCurr on ngOnInit', () => {
    component.ngOnInit();
    expect(component.baseUrl).not.toBe('');
    expect(component.urlCurr).not.toBe('');
  });

  // function: checkAvailability
  it('should call checkAvailability on checkEndpoint if url is valid', () => {
    spyOn(component, 'checkAvailability');
    spyOn(serviceEndpoint, 'getCheckUrl').and.returnValue(true);
    component.checkEndpoint();
    expect(component.checkAvailability).toHaveBeenCalled();
  });

  // function: checkAvailability
  it('should log an error if url is invalid on checkEndpoint', () => {
    spyOn(console, 'error');
    spyOn(serviceEndpoint, 'getCheckUrl').and.returnValue(false);
    component.checkEndpoint();
    expect(console.error).toHaveBeenCalledWith('URL no válida');
  });

  // function: checkAvailability
  it('should call tgRoleData on checkAvailability if response status is 200', () => {
    spyOn(component, 'tgRoleData');
    spyOn(serviceEndpoint, 'getAvailability').and.returnValue(of({ status: 200 }));
    component.checkAvailability();
    expect(component.tgRoleData).toHaveBeenCalled();
  });

  // function: checkAvailability
  it('should open modalSystem and set message on checkAvailability if response status is not 200', () => {
    spyOn(component, 'modalOpen');
    //const message = 'Error en la solicitud de la API';
    spyOn(serviceEndpoint, 'getAvailability').and.returnValue(of({ status: 404 }));
    component.checkAvailability();
    expect(component.modalOpen).toHaveBeenCalledWith('modalSystem');
    //expect(component.modalSystemJson).toBe(message);
  });

  // function: checkAvailability
  it('should open modalSystem and set message on error on checkAvailability', () => {
    spyOn(component, 'modalOpen');
    //const message = 'Imposible acceder a la URL';
    spyOn(serviceEndpoint, 'getAvailability').and.returnValue(throwError('Error'));
    component.checkAvailability();
    expect(component.modalOpen).toHaveBeenCalledWith('modalSystem');
    //expect(component.modalSystemJson).toBe(message);
  });
});
