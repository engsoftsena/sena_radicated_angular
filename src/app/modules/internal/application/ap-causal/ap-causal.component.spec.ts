import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApCausalComponent } from './ap-causal.component';

import { of, throwError } from 'rxjs';

import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { AuthService } from 'src/app/services/functions/auth/auth.service';

describe('ApCausalComponent', () => {
  let component: ApCausalComponent;
  let fixture: ComponentFixture<ApCausalComponent>;
  let serviceAuth: AuthService;
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
        AuthService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApCausalComponent);
    component = fixture.componentInstance;
    // Inicializar el servicio usando TestBed.inject
    serviceAuth = TestBed.inject(AuthService);
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

  // function: tgRoleData
  it('should call syModuleData if response is valid', () => {
    spyOn(component, 'syModuleData');
    const mockResponse = { /* datos simulados de respuesta */ };
    spyOn(serviceAuth, 'getAuthJwt').and.returnValue(of(mockResponse));
  
    // Simular que getDataError devuelve true para que se llame a syModuleData
    spyOn(component, 'getDataError').and.returnValue(true);
    
    component.tgRoleData();
    
    expect(serviceAuth.getAuthJwt).toHaveBeenCalled();
    expect(component.syModuleData).toHaveBeenCalledWith(mockResponse);
  });
  
  // function: tgRoleData
  it('should handle error and open modalSystem on checkAvailability', () => {
    spyOn(component, 'modalSystemJson');
    const mockError = 'Error de prueba';
    spyOn(serviceAuth, 'getAuthJwt').and.returnValue(throwError(mockError));
    
    component.tgRoleData();
    
    expect(serviceAuth.getAuthJwt).toHaveBeenCalled();
    expect(component.modalSystemJson).toHaveBeenCalledWith('Ocurrió un error en la solicitud', mockError);
  });
  
  
  
  
});
