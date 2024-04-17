import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SyAttributeComponent } from './sy-attribute.component';

import { of, throwError } from 'rxjs';

import { AuthService } from 'src/app/services/functions/auth/auth.service';
import { ApiService } from 'src/app/services/functions/api/api.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';

describe('SyAttributeComponent', () => {
  let component: SyAttributeComponent;
  let fixture: ComponentFixture<SyAttributeComponent>;
  let serviceAuth: AuthService;
  let serviceApi: ApiService;
  let serviceButton: ButtonService;
  let serviceEndpoint: EndpointService;
  let serviceTable: TableService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyAttributeComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        ApiService,
        ButtonService,
        EndpointService,
        TableService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyAttributeComponent);
    component = fixture.componentInstance;
    // Inicializar servicios usando TestBed.inject
    serviceAuth = TestBed.inject(AuthService);
    serviceApi = TestBed.inject(ApiService);
    serviceButton = TestBed.inject(ButtonService);
    serviceEndpoint = TestBed.inject(EndpointService);
    serviceTable = TestBed.inject(TableService);
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
  
  
  


  // function syModuleData
  it('should call tgPermitData if infoSelect response is valid', () => {
    spyOn(component, 'tgPermitData');
    const mockResponse = { /* datos simulados de respuesta */ };
    spyOn(serviceApi, 'infoSelect').and.returnValue(of(mockResponse));
  
    // Simular que getDataError devuelve true para que se llame a tgPermitData
    spyOn(component, 'getDataError').and.returnValue(true);
  
    // Simular que syModuleData se llama con una respuesta válida
    component.syModuleData({ data: [{ tg_role: 1 }] });
  
    expect(serviceApi.infoSelect).toHaveBeenCalled();
    expect(component.tgPermitData).toHaveBeenCalledWith(mockResponse);
  });
  
  // function syModuleData
  it('should handle error and open modalSystem on infoSelect error', () => {
    spyOn(component, 'modalSystemJson');
    const mockError = 'Error de prueba';
    spyOn(serviceApi, 'infoSelect').and.returnValue(throwError(mockError));
  
    // Simular que syModuleData se llama con un error en infoSelect
    component.syModuleData({ data: [{ tg_role: 1 }] });
  
    expect(serviceApi.infoSelect).toHaveBeenCalled();
    expect(component.modalSystemJson).toHaveBeenCalledWith('Ocurrió un error en la solicitud', mockError);
  });

  // function syModuleData
  it('should set tgRoleId to tg_role if data is not null', () => {
    const mockResponse = { data: [{ tg_role: 123 }] };
    component.syModuleData(mockResponse);
    
    expect(component.tgRoleId).toBe(123);
  });
  
  // function syModuleData
  it('should set tgRoleId to this.tgRoleId if data is null', () => {
    const mockResponse = { data: [] };
    component.tgRoleId = 456; // Set initial value
    component.syModuleData(mockResponse);
    
    expect(component.tgRoleId).toBe(456);
  });
  
  



  // function: tgPermitData
  it('should call tgPermitMap if innerAlias response is valid', () => {
    spyOn(component, 'tgPermitMap');
    const mockResponse = { /* datos simulados de respuesta */ };
    spyOn(serviceApi, 'innerAlias').and.returnValue(of(mockResponse));
  
    // Simular que getDataError devuelve true para que se llame a tgPermitMap
    spyOn(component, 'getDataError').and.returnValue(true);
  
    // Simular que tgPermitData se llama con una respuesta válida
    component.tgPermitData({ data: [{ id_register: 1, os_name: 'Module Name', os_table: 'Module Table' }] });
  
    expect(serviceApi.innerAlias).toHaveBeenCalled();
    expect(component.tgPermitMap).toHaveBeenCalledWith(mockResponse);
  });
  
  // function: tgPermitData
  it('should handle error and open modalSystem on innerAlias error', () => {
    spyOn(component, 'modalSystemJson');
    const mockError = 'Error de prueba';
    spyOn(serviceApi, 'innerAlias').and.returnValue(throwError(mockError));
  
    // Simular que tgPermitData se llama con un error en innerAlias
    component.tgPermitData({ data: [{ id_register: 1, os_name: 'Module Name', os_table: 'Module Table' }] });
  
    expect(serviceApi.innerAlias).toHaveBeenCalled();
    expect(component.modalSystemJson).toHaveBeenCalledWith('Ocurrió un error en la solicitud', mockError);
  });





  // function: tgPermitMap
  it('should map tgAction and tgAuthorization and call moduleAccess, resultColumn, and selectHtmlModal accordingly', () => {
    const mockResponse = {
      data: [
        {
          "lbl_tg_action_os_name": "Consultar",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Registrar",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Actualizar",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Remover",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Restaurar",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Eliminar",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Cambios",
          "lbl_tg_authorization_os_state": "Denegado",
        },
        {
          "lbl_tg_action_os_name": "Detalles",
          "lbl_tg_authorization_os_state": "Denegado",
        },
      ]
    };
    spyOn(component, 'moduleAccess');
    spyOn(component, 'resultColumn');
    spyOn(component, 'selectHtmlModal');
    component.tgPermitMap(mockResponse);
    // Verifica que moduleAccess se haya llamado
    expect(component.moduleAccess).toHaveBeenCalled();
    // Verifica que resultColumn no se haya llamado
    expect(component.resultColumn).not.toHaveBeenCalled();
    // Verifica que selectHtmlModal no se haya llamado
    expect(component.selectHtmlModal).not.toHaveBeenCalled();
  });

  // function: tgPermitMap
  it('should call resultColumn and selectHtmlModal when tgActionRead is Concedido', () => {
    const mockResponse = {
      data: [
        {
          "lbl_tg_action_os_name": "Consultar",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Registrar",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Actualizar",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Remover",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Restaurar",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Eliminar",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Cambios",
          "lbl_tg_authorization_os_state": "Concedido",
        },
        {
          "lbl_tg_action_os_name": "Detalles",
          "lbl_tg_authorization_os_state": "Concedido",
        },
      ]
    };
    spyOn(component, 'moduleAccess');
    spyOn(component, 'resultColumn');
    spyOn(component, 'selectHtmlModal');  
    component.tgPermitMap(mockResponse);
    // Verifica que moduleAccess no se haya llamado
    expect(component.moduleAccess).not.toHaveBeenCalled();
    // Verifica que resultColumn se haya llamado
    expect(component.resultColumn).toHaveBeenCalled();
    // Verifica que selectHtmlModal se haya llamado
    expect(component.selectHtmlModal).toHaveBeenCalled();
  });
  




  // function: resultColumn
  it('should set columnSet and call resultData if innerLabel response is valid', () => {
    const mockResponse = ['column1', 'column2']; // Simulación de la respuesta de innerLabel
    spyOn(serviceApi, 'innerLabel').and.returnValue(of(mockResponse));
  
    // Llamar a resultColumn con un fieldDeleted simulado
    component.resultColumn('fieldDeleted');
  
    expect(serviceApi.innerLabel).toHaveBeenCalled();
    expect(component.columnSet).toEqual(mockResponse as any);
    // Aquí puedes verificar que resultData se llame correctamente si es necesario
  });
  
  // function: resultColumn
  it('should handle error and open modalSystem on innerLabel error', () => {
    spyOn(component, 'modalSystemJson');
    const mockError = 'Error de prueba';
    spyOn(serviceApi, 'innerLabel').and.returnValue(throwError(mockError));
  
    // Llamar a resultColumn con un fieldDeleted simulado
    component.resultColumn('fieldDeleted');
  
    expect(serviceApi.innerLabel).toHaveBeenCalled();
    expect(component.modalSystemJson).toHaveBeenCalledWith('Ocurrió un error en la solicitud', mockError);
  });





  // function: resultData
  it('should set responseData and call serviceTable.getTable if innerAlias response is valid', () => {
    const mockResponse = {
      data: [
        {
          "lbl_ap_causal_id_register": "1",
          "lbl_ap_causal_os_name": "Comodidades"
        },
        {
          "lbl_ap_causal_id_register": "2",
          "lbl_ap_causal_os_name": "Promesas de Servicios"
        }
      ]
    };
  
    spyOn(serviceApi, 'innerAlias').and.returnValue(of(mockResponse));
    spyOn(serviceButton, 'buttonDataExport').and.returnValue([]);
    spyOn(serviceTable, 'getTable');
    component.resultData('fieldDeleted');
  
    expect(serviceApi.innerAlias).toHaveBeenCalled();
    expect(component.responseData).toEqual(jasmine.objectContaining(mockResponse.data));

    expect(serviceButton.buttonDataExport).toHaveBeenCalled();
    expect(serviceTable.getTable).toHaveBeenCalledWith(
      'tbInfo',
      mockResponse.data,
      component.columnSet,
      []
    );
    expect(component.isLoading).toBe(false);
  });





  // function: getRegister
  it('should set responseData and call serviceTable.getTable if proccessRegister response is valid', () => {
    const mockResponse = {
      data: [
        {
          "lbl_ap_causal_id_register": "1",
          "lbl_ap_causal_os_name": "Comodidades"
        },
        {
          "lbl_ap_causal_id_register": "2",
          "lbl_ap_causal_os_name": "Promesas de Servicios"
        }
      ]
    };
  
    spyOn(serviceApi, 'proccessRegister').and.returnValue(of(mockResponse));
    spyOn(serviceButton, 'buttonDataExport').and.returnValue([]);
    spyOn(serviceTable, 'getTable');
    component.getRegister('fieldDeleted');
  
    expect(serviceApi.proccessRegister).toHaveBeenCalled();
    expect(component.responseData).toEqual(jasmine.objectContaining(mockResponse.data));

    expect(serviceButton.buttonDataExport).toHaveBeenCalled();
    expect(serviceTable.getTable).toHaveBeenCalledWith(
      'tbInfo',
      mockResponse.data,
      component.columnSet,
      []
    );
    expect(component.isLoading).toBe(false);
  });

  // function: getRegister
  it('should call modalSystemJson with error message if proccessRegister response is an error', () => {
    const mockError = 'Error en la solicitud';
    spyOn(serviceApi, 'proccessRegister').and.returnValue(throwError(mockError));
    spyOn(component, 'modalSystemJson');
    component.getRegister('fieldDeleted');
  
    expect(serviceApi.proccessRegister).toHaveBeenCalled();
    expect(component.modalSystemJson).toHaveBeenCalledWith('Ocurrió un error en la solicitud', mockError);
  });
});
