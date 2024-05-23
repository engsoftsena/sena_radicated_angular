import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Importar Variables de Entorno
import { Environment } from 'src/environments/environment';
// Importacion de Modulos
// Importacion de Servicios
import { ApiService } from 'src/app/services/functions/api/api.service';
import { AuthService } from 'src/app/services/functions/auth/auth.service';
import { BaseurlService } from 'src/app/services/functions/baseurl/baseurl.service';
import { ButtonService } from 'src/app/services/functions/button/button.service';
import { EndpointService } from 'src/app/services/functions/endpoint/endpoint.service';
import { TableService } from 'src/app/services/functions/table/table.service';
// Importacion de Servicios
// Importacion de Funciones Generales
import { expTableRegister, expTableRemove } from 'src/app/functions/data-table';
import { fncInputChange } from 'src/app/functions/input-html';
import {
  expFormCollect,
  expModalClass,
  expModalClose,
  expModalMapData,
  expModalReset
} from 'src/app/functions/modal-form';
import { expSelectHtmlIds, expSelectHtmlMap } from 'src/app/functions/select-html';
// Importacion de Librerias
import * as $ from 'jquery';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ap-resource',
  templateUrl: './ap-resource.component.html',
  styleUrls: ['./ap-resource.component.scss']
})
export class ApResourceComponent implements OnInit {
  @ViewChild('tableData') tableData: ElementRef | undefined;

  dmTmpl: string = Environment.domain_tmpl;

  constructor (
    private router: Router,
    private serviceApi: ApiService,
    private serviceAuth: AuthService,
    private serviceBaseurl: BaseurlService,
    private serviceButton: ButtonService,
    private serviceEndpoint: EndpointService,
    private serviceTable: TableService,
  ) {}

  baseUrl: string = '';
  urlCurr: string = '';

  syModuleId: number = 0;
  syModuleName: any;
  syModuleTable: any;
  syPrefixId: number = 5;
  tgRoleId: number = 0;

  tgActionRead: any;
  tgActionCreate: any;
  tgActionUpdate: any;
  tgActionRemove: any;
  tgActionRestore: any;
  tgActionDelete: any;
  tgActionChange: any;
  tgActionDetail: any;

  tableComponent: string = `ap_resource`;
  tableSysEliminate: string = 'sy_eliminate';
  deletedData: any;
  isLoading: boolean = false;
  columnSet: [] | undefined;
  responseData: [] = [];
  responseChange: [] = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.getUrlHref();
    this.checkEndpoint();
  }

  ngAfterViewInit() {
    this.tableDataValue();
  }

  modalClass() { expModalClass(); }

  getUrlHref() {
    this.baseUrl = this.serviceBaseurl.getBaseUrl();
    this.urlCurr = this.serviceEndpoint.getCurrentUrl();
  }

  checkEndpoint() {
    if (this.serviceEndpoint.getCheckUrl()) {
      this.checkAvailability();
    } else {
      console.error('URL no válida');
    }
  }

  checkAvailability() {
    let message = '';
    this.serviceEndpoint.getAvailability().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.tgRoleData();
        } else {
          message = 'Error en la solicitud de la API';
          this.modalOpen('modalSystem');
          this.modalSystemJson(message, response);
        }
      },
      error: (error) => {
        message = 'Imposible acceder a la URL';
        this.modalSystemJson(message, error);
      }
    });
  }

  tgRoleData() {
    this.serviceAuth.getAuthJwt().subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.syModuleData(response); }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  syModuleData(response: any) {
    if (response.data.length > 0) {
      const data = response.data[0];
      this.tgRoleId = data?.tg_role || this.tgRoleId;
    }
    const params = {
      table: `sy_module`,
      column: `*`,
      whereCond: `WHERE,AND`,
      whereField: `os_table,sy_prefix`,
      whereOperator: `=,=`,
      whereEqual: `resource,${this.syPrefixId}`,
    };
    this.serviceApi.infoSelect(params).subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.tgPermitData(response); }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgPermitData(response: any) {
    if (response.data.length > 0) {
      const data = response.data[0];
      this.syModuleId = data?.id_register || this.syModuleId;
      this.syModuleName = data?.os_name || this.syModuleName;
      this.syModuleTable = data?.os_table || this.syModuleTable;
    }
    const params = {
      table: `tg_permit`,
      column: `*`,
      whereCond: `WHERE,AND`,
      whereField: `sy_module,tg_role`,
      whereOperator: `=,=`,
      whereEqual: `${this.syModuleId},${this.tgRoleId}`,
    };
    this.serviceApi.innerAlias(params).subscribe({
      next: (response: any) => {
        const checkDataError = this.getDataError(response);
        if (checkDataError) { this.tgPermitMap(response);}
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  tgPermitMap(response: any) {
    // Mapea los datos del servicio al formato esperado
    for (let item of response.data) {
      let tgAction = item.lbl_tg_action_os_name;
      let tgAuthorization = item.lbl_tg_authorization_os_state;
      if (tgAction == 'Consultar') { this.tgActionRead = tgAuthorization; }
      if (tgAction == 'Registrar') { this.tgActionCreate = tgAuthorization; }
      if (tgAction == 'Actualizar') { this.tgActionUpdate = tgAuthorization; }
      if (tgAction == 'Remover') { this.tgActionRemove = tgAuthorization; }
      if (tgAction == 'Restaurar') { this.tgActionRestore = tgAuthorization; }
      if (tgAction == 'Eliminar') { this.tgActionDelete = tgAuthorization; }
      if (tgAction == 'Cambios') { this.tgActionChange = tgAuthorization; }
      if (tgAction == 'Detalles') { this.tgActionDetail = tgAuthorization; }
    }
    if (this.tgActionRead == 'Denegado') { this.moduleAccess(); }
    if (this.tgActionRead == 'Concedido') {
      this.resultColumn(this.deletedData);
      this.selectHtmlModal();
    }
  }

  resultColumn(fieldDeleted: string) {
    const params = {
      table: this.tableComponent,
      column: '*',
      whereCond: '',
      whereField: '',
      whereOperator: '',
      whereEqual: '',
    };
    this.serviceApi.innerLabel(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.resultData(fieldDeleted);
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  resultData(fieldDeleted: string) {
    const params = {
      table: this.tableComponent,
      column: '*',
      whereCond: 'WHERE',
      whereField: this.tableSysEliminate,
      whereOperator: '=',
      whereEqual: fieldDeleted,
    };
    this.serviceApi.innerAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.responseData = response.data;
          console.log(this.responseData);
          const buttonsData = this.serviceButton.buttonDataExport();
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbInfo',
            this.responseData,
            this.columnSet,
            buttonsData
          );
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  getRegister(fieldDeleted: string) {
    const params = {
      table: this.tableComponent,
      column: '*',
      whereCond: 'WHERE',
      whereField: this.tableSysEliminate,
      whereOperator: '=',
      whereEqual: fieldDeleted,
    };
    this.serviceApi.proccessRegister(params).subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.responseData = response.data;
        console.log(this.responseData);
        const buttonsData = this.serviceButton.buttonDataExport();
        // Construir tabla con datos y botones
        this.serviceTable.getTable(
          'tbInfo',
          this.responseData,
          this.columnSet,
          buttonsData
        );
        this.isLoading = false;
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  changeColumn(osRegsiter: string) {
    const params = {
      table: 'sy_change',
      column: 'id_register,os_date,os_hour,os_shift',
      whereCond: '',
      whereField: '',
      whereOperator: '',
      whereEqual: '',
    };
    this.serviceApi.innerLabel(params).subscribe({
      next: (response: any) => {
        console.log(response);
        this.columnSet = response;
        this.changeResult(osRegsiter);
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  changeResult(osRegister: any) {
    console.log(osRegister);
    const params = {
      table: 'sy_change',
      column: 'id_register,os_date,os_hour,os_shift',
      whereCond: 'WHERE,AND',
      whereField: `os_register,sy_module`,
      whereOperator: '=,=',
      whereEqual: `${osRegister},${this.syModuleId}`,
    };
    this.serviceApi.innerAlias(params).subscribe({
      next: (response: any) => {
        console.log(response);
        const checkDataError = this.getDataError(response);
        if (checkDataError) {
          // Mapea los datos del servicio al formato esperado
          this.responseChange = response.data;
          console.log(this.responseChange);
          const buttonsData = this.serviceButton.buttonDataExport();
          // Construir tabla con datos y botones
          this.serviceTable.getTable(
            'tbChange',
            this.responseChange,
            this.columnSet,
            buttonsData
          );
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        let message = 'Ocurrió un error en la solicitud';
        this.modalSystemJson(message, err);
      },
      complete: () => (false),
    });
  }

  getDataError(response: any): true | undefined {
    console.log(response);
    let message;
    if (response.data && Array.isArray(response.data)) {
      const tokenErrors = response.data
      .filter(
        (item: any) => 'error' in item &&
        item.error.toLowerCase().includes('token')
      )
      .map((item: any) => item.error);
      if (tokenErrors.length > 0) { this.responseToken(response); } else {
        const hasErrors = response.data.some((item: any) => 'error' in item);
        if (!hasErrors) { return true; } else {
          message = 'Identificamos los siguientes errores en la consulta';
          this.modalSystemData(message, response);
        }
      }
    } else {
      message = 'Identificamos que la solicitud no tiene un formato correcto';
      this.modalSystemData(message, response);
    }
    return undefined;
  }

  tableDataValue(load: boolean = false) {
    if (this.tableData && this.tableData.nativeElement instanceof HTMLSelectElement) {
      const selectedValue = this.tableData.nativeElement.value;
      this.deletedData = selectedValue;
    }
    this.tableDataFilter(this.deletedData, load);
  }

  tableDataFilter(delValue: any, load: boolean = false) {
    if (load) { this.resultColumn(delValue); }
    if (delValue == '1') { expTableRegister(); }
    if (delValue == '2') { expTableRemove(); }
  }

  modalOpen(modalForm: string) {
    const modalElement = document.getElementById(modalForm);
    if (modalElement) {
      new Modal(modalElement).show();
      this.modalHelp(modalElement);
      this.formAjaxHide();
      this.helpUnlock('insert');
      this.helpUnlock('update');
    }
  }

  modalHelp(modalForm: any) {
    // Obtener todos los divs que terminan con "Field"
    const fieldDivs = modalForm.querySelectorAll('[id$=Field]');
    // Iterar sobre los divs encontrados
    fieldDivs.forEach((fieldDiv: { querySelectorAll: (arg0: string) => any; id: string; }) => {
      // Obtener todos los elementos input y select dentro del div
      const elmtsHtml = fieldDiv.querySelectorAll('input, select, textarea');
      // Construir el ID del select correspondiente
      const selectId = 'help_' + fieldDiv.id.replace('Field', '');
      // Obtener el select correspondiente al div actual
      const helpSelect = modalForm.querySelector(`#${selectId}`);
      // Verificar si el select existe
      if (helpSelect) {
        // Vaciar el contenido del select
        helpSelect.textContent = '';
        // Crear un nuevo option para "Seleccionar Valor"
        const selectOption = document.createElement('option');
        selectOption.value = '';
        selectOption.textContent = 'Seleccionar Valor';
        // Agregar el nuevo option al select
        helpSelect.appendChild(selectOption);
        // Iterar sobre todos los elementos input y select
        elmtsHtml.forEach((element: {
          id: any; closest: (arg0: string) => any;
        }) => {
          // Obtener el valor y el texto del label asociado al elemento
          const label = element.closest('.form-group').querySelector('label');
          const labelText = label ? label.textContent?.trim() : '';
          const elementId = element.id;
          // Crear un nuevo option con el valor y el texto obtenidos
          const newOption = document.createElement('option');
          newOption.value = elementId;
          newOption.textContent = labelText;
          // Agregar el nuevo option al select
          helpSelect.appendChild(newOption);
        });
      }
    });
  }

  helpGuide(helpLock: any, helpGuide: any, helpBool: any) {
    helpGuide.disabled = helpBool;
    helpLock.classList.add('d-none');
    helpGuide.classList.remove('d-none');
  }

  helpBlock(helpLock: any, helpGuide: any) {
    if (helpLock && helpGuide) {
      helpGuide.disabled = true;
      helpLock.classList.remove('d-none');
      helpGuide.classList.add('d-none');
    }
  }

  helpSelect(typeSel: string) {
    let helpLock: HTMLButtonElement | null = null;
    let helpGuide: HTMLButtonElement | null = null;
    let selectElement: HTMLSelectElement | null;
    let selectedValue: string | null = null;

    helpLock = document.getElementById(`${typeSel}Lock`) as HTMLButtonElement | null;
    helpGuide = document.getElementById(`${typeSel}Guide`) as HTMLButtonElement | null;
    selectElement = document.getElementById(`help_${typeSel}`) as HTMLSelectElement | null;
    selectedValue = selectElement?.value || null;

    if (helpLock && helpGuide) {
      if (selectedValue === '' || selectedValue === null) {
        this.helpGuide(helpLock, helpGuide, true);
      } else {
        this.helpGuide(helpLock, helpGuide, false);
      }
    }
  }

  helpCols(dataForm: any, dataHelp: any, valSlct: any) {
    let colOrig = ['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-12', 'd-none'];
    let colForm = ['col-sm-8', 'col-md-8', 'col-lg-8', 'col-xl-8'];
    let colHelp = ['col-sm-4', 'col-md-4', 'col-lg-4', 'col-xl-4'];

    if (dataForm) {
      dataForm.classList.remove(...colOrig, ...colForm);
      dataForm.classList.add(
        ...(
          valSlct === '' ||
          valSlct === null ?
          colOrig : colForm
        )
      );
    }

    if (dataHelp) {
      dataHelp.classList.remove(...colOrig, ...colHelp);
      dataHelp.classList.add(
        ...(
          valSlct === '' ||
          valSlct === null ?
          colOrig : colHelp
        )
      );
    }
  }

  helpOrigin(dataForm: any, dataHelp: any) {
    let colOrig = ['col-sm-12', 'col-md-12', 'col-lg-12', 'col-xl-12'];
    let colForm = ['col-sm-8', 'col-md-8', 'col-lg-8', 'col-xl-8'];
    let colHelp = ['col-sm-4', 'col-md-4', 'col-lg-4', 'col-xl-4'];

    if (dataForm) {
      dataForm.classList.remove(...colOrig, ...colForm);
      dataForm.classList.add(...colOrig);
    }

    if (dataHelp) {
      dataHelp.classList.remove(...colOrig, ...colHelp);
      dataHelp.classList.add(...colOrig, 'd-none');
    }
  }

  helpUnlock(typeSel: string) {
    const dataForm = document.getElementById(`${typeSel}Form`);
    const dataHelp = document.getElementById(`${typeSel}Help`);
    this.helpOrigin(dataForm, dataHelp);

    const selectElement = document.getElementById(`help_${typeSel}`) as HTMLSelectElement;
    selectElement.value = '';
    selectElement.disabled = false;

    let helpLock = document.getElementById(`${typeSel}Lock`) as HTMLButtonElement;
    let helpGuide = document.getElementById(`${typeSel}Guide`) as HTMLButtonElement;
    if (helpLock && helpGuide) { this.helpGuide(helpLock, helpGuide, true); }
  }

  helpAction(action: any) {
    let dataForm = document.getElementById(`${action}Form`);
    let dataHelp = document.getElementById(`${action}Help`);

    let selectElement = document.getElementById(`help_${action}`) as HTMLSelectElement;
    let helpLock = document.getElementById(`${action}Lock`) as HTMLButtonElement;
    let helpGuide = document.getElementById(`${action}Guide`) as HTMLButtonElement;

    let selectedValue = selectElement.value;
    selectElement.disabled = true;
    let cleanedValue = selectedValue.replace(new RegExp(`^${action}_`), '');
    console.log('cleanedValue', cleanedValue);

    this.helpCols(dataForm, dataHelp, selectedValue);
    this.helpBlock(helpLock, helpGuide);
    this.helpMap(dataHelp, cleanedValue);
  }

  helpMap(dataHelp: any, fieldKey: string) {
    if (dataHelp) {
      // Obtener las definiciones de campo
      const fieldDefinition = this.helpMssg();
      const dataFilter = fieldKey as keyof typeof fieldDefinition;
      if (dataFilter in fieldDefinition) {
        const filteredData = fieldDefinition[dataFilter];
        // Crear y agregar el contenido
        const helpContent = this.helpContent(dataHelp, filteredData);
        dataHelp.appendChild(helpContent);
      } else {
        console.error(`La clave del campo "${dataFilter}" no existe.`);
      }
    }
  }

  helpContent(dataHelp: any, definition: any): DocumentFragment {
    const fragment = document.createDocumentFragment();
    if (dataHelp) {
      const titleElement = dataHelp.querySelector('.toast-header strong');
      if (titleElement) { titleElement.textContent = ''; }
      if (titleElement) { titleElement.textContent = definition.title; }
      // Limpiar solo el contenido generado por helpCard
      const helpCardContainers = dataHelp.querySelectorAll('.card.rounded-0.mb-1');
      if (helpCardContainers) {
        helpCardContainers.forEach(
          (container: {
            remove: () => void;
          }) => {
            container.remove();
          }
        );
      }
      // Verificar si definition tiene una propiedad 'title'
      if ('title' in definition) {
        // Crear y agregar los mensajes
        for (const key in definition) {
          if (key !== 'title') {
            const messageCard = this.helpCard(definition[key]);
            fragment.appendChild(messageCard);
          }
        }
      }
    }
    return fragment;
  }

  helpCard(message: string): HTMLDivElement {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('card', 'rounded-0', 'mb-1');
    messageDiv.innerHTML = `
      <div class="card-body p-1">
        <div class="alert alert-warning alert-dismissible
        fade show p-1 rounded-0 mb-0 text-center" role="alert">
          <div class="d-flex align-items-center">
            <div class="flex-1">
              <span>${message}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    return messageDiv;
  }

  helpMssg() {
    let fieldHelp = {
      'id_register': {
        'title': 'Registro',
        'required': 'Campo obligatorio',
        'alphanumeric': 'Permitido caracteres alfanumericos',
      },
      'os_name': {
        'title': 'Nombre',
        'required': 'Campo obligatorio',

        'alphabetic': 'Permitido caracteres alfabeticos',
        'accents': 'Permitido caracteres con acentos',
        'mixedcase': 'Permitido mayúsculas y minúsculas',
        'spaces': 'Permitido con espacios',

        'minLength': 'Permitido minimo 5 caracteres',
        'maxLength': 'Permitido maximo 255 caracteres',

        'noCharacter': 'No se permiten caracteres especiales',
      },
      'ap_causal': {
        'title': 'Causal',
        'required': 'Campo obligatorio',
        'allowedValues': 'Permitido valores establecidos',
      },
    };
    return fieldHelp;
  }

  modalSystemData(message: any, response: any) {
    console.error(message, response);
    // Mostrar alerta con los errores
    const errorMessages = response.data
      .filter((item: any) => 'error' in item)
      .map((item: { error: any; }) => item.error)
      .join('\n');
    const formMssg = document.getElementById('formSystemMssg');
    if (formMssg) { formMssg.innerHTML = ''; }
    if (formMssg) { formMssg.innerHTML = `${message}`; }
    const formAjax = document.getElementById('formSystemAjax');
    if (formAjax) { formAjax.innerHTML = ''; }
    if (formAjax) { formAjax.innerHTML = `${errorMessages}`; }
    this.modalOpen('modalSystem');
    this.isLoading = false;
  }

  modalSystemJson(message: any, response: any) {
    console.error(message, response);
    const jStringify = JSON.stringify(response, null, 2);
    const formMssg = document.getElementById('formSystemMssg');
    if (formMssg) { formMssg.innerHTML = ''; }
    if (formMssg) { formMssg.innerHTML = `${message}`; }
    const formAjax = document.getElementById('formSystemAjax');
    if (formAjax) { formAjax.innerHTML = ''; }
    if (formAjax) { formAjax.innerHTML = `${jStringify}`; }
    this.modalOpen('modalSystem');
    this.isLoading = false;
  }

  async modalRecord(modalForm: string, modalOption: string) {
    this.helpUnlock('insert');
    this.helpUnlock('update');
    let message;
    // Obtener el primer valor seleccionado de la tabla
    let idtbl = $('#tbInfo tr.selected td:first').html();
    // Validar si el id es mayor a cero
    if (Number(idtbl) > 0) {
      const params = {
        table: this.tableComponent,
        column: '*',
        whereCond: `WHERE`,
        whereField: `id_register`,
        whereOperator: `=`,
        whereEqual: `${idtbl}`,
      };
      const serviceResolve = await this.serviceApi.resolveRegister(params);
      if (serviceResolve.data && Array.isArray(serviceResolve.data)) {
        const hasErrors = serviceResolve.data.some((item: any) => 'error' in item);
        if (hasErrors) {
          let message = 'Ocurrió un error en la solicitud';
          this.modalSystemData(message, serviceResolve);
        } else {
          // Continuar con el proceso porque no hay errores
          this.modalOpen(modalForm);
          expModalMapData(modalOption, serviceResolve);
          if (modalForm == 'modalChange') { this.changeColumn(idtbl); }
        }
      } else {
        message = 'No tiene un formato en array.';
        const swalOptions = {
          'swalMessage': message,
          'swalIcon': 'error',
          'swalTitle': 'Error',
        };
        this.swalFireMssg(swalOptions);
      }
    } else {
      message = 'No has seleccionado ningún registro.';
      const swalOptions = {
        'swalMessage': message,
        'swalIcon': 'warning',
        'swalTitle': 'Advertencia',
      };
      this.swalFireMssg(swalOptions);
    }
  }

  selectHtmlModal() {
    const { prefixes, idHtmlValues } = expSelectHtmlIds();
    // Llama a la función con valores reemplazados
    this.selectHtmlSearch(prefixes, idHtmlValues);
  }

  selectHtmlSearch(modalPrefix: any, idHtml: string[]) {
    idHtml.forEach((item) => {
      // Construir parametros para sql
      const params = {
        table: this.tableComponent,
        htmlSelect: item,
      };
      this.selectHtmlSend(modalPrefix, params);
    });
  }

  selectHtmlSend(modalPrefix: any, params: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.proccessHtmlSelect(params).subscribe({
      next: (response) => {
        console.log(response);
        expSelectHtmlMap(modalPrefix, params, response);
      },
      error: (error) => {
        message = 'Error en la solicitud GET de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  formDelete(modalForm: any) {
    const whereForm = expFormCollect(modalForm, 'deleteWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionDelete() {
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalDelete',
      'formId': 'formDeleteData',
      'formAjax': 'formDeleteAjax',
      'formPrefix': 'delete_',
    };
    // Retornar Informacion
    const {
      whereColumn,
      whereForm,
      whereData,
    } = this.formDelete(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...whereForm };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      dataType: 'delete',
      table: this.tableComponent,
      column: `${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendDelete(modalForm, params, jsonData);
  }

  sendDelete(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.proccessDelete(params, jsonData).subscribe({
      next: (response) => {
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud DELETE de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  formInsert(modalForm: any) {
    const formData = expFormCollect(modalForm, 'insertField');
    formData[this.tableSysEliminate] = '1';
    const dataColumn = Object.keys(formData).join(',');
    return { formData, dataColumn, };
  }

  actionInsert() {
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalInsert',
      'formId': 'formInsertData',
      'formAjax': 'formInsertAjax',
      'formPrefix': 'insert_',
    };
    // Retornar Informacion
    const { formData, dataColumn, } = this.formInsert(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      dataType: 'insert',
      table: this.tableComponent,
      column: dataColumn,
    };
    this.sendInsert(modalForm, params, jsonData);
  }

  sendInsert(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.proccessInsert(params, jsonData).subscribe({
      next: (response) => {
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud INSERT de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  formRemove(modalForm: any) {
    const formData = expFormCollect(modalForm, 'removeField');
    formData[this.tableSysEliminate] = '2';
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = expFormCollect(modalForm, 'removeWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionRemove() {
    fncInputChange('remove_tb_eliminate', '2');
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalRemove',
      'formId': 'formRemoveData',
      'formAjax': 'formRemoveAjax',
      'formPrefix': 'remove_',
    };
    // Retornar Informacion
    const {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    } = this.formRemove(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData, ...whereForm };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      dataType: 'remove',
      table: this.tableComponent,
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  formRestore(modalForm: any) {
    const formData = expFormCollect(modalForm, 'restoreField');
    formData[this.tableSysEliminate] = '1';
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = expFormCollect(modalForm, 'restoreWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionRestore() {
    fncInputChange('restore_tb_eliminate', '1');
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalRestore',
      'formId': 'formRestoreData',
      'formAjax': 'formRestoreAjax',
      'formPrefix': 'restore_',
    };
    // Retornar Informacion
    const {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    } = this.formRestore(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData, ...whereForm };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      dataType: 'restore',
      table: this.tableComponent,
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  formUpdate(modalForm: any) {
    const formData = expFormCollect(modalForm, 'updateField');
    const dataColumn = Object.keys(formData).join(',');

    const whereForm = expFormCollect(modalForm, 'updateWhere');
    const whereColumn = Object.keys(whereForm).join(',');
    const whereData = Object.values(whereForm).join(',');

    return {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    };
  }

  actionUpdate() {
    // Parametros de HTML
    const modalForm = {
      'modalId': 'modalUpdate',
      'formId': 'formUpdateData',
      'formAjax': 'formUpdateAjax',
      'formPrefix': 'update_',
    };
    // Retornar Informacion
    const {
      formData,
      dataColumn,
      whereForm,
      whereColumn,
      whereData,
    } = this.formUpdate(modalForm);
    // Unificar un solo objeto
    const combinedData = { ...formData, ...whereForm };
    const jsonData = JSON.stringify(combinedData);
    // Construir parametros para sql
    const params = {
      dataType: 'update',
      table: this.tableComponent,
      column: `${dataColumn},${whereColumn}`,
      whereCond: 'WHERE',
      whereField: whereColumn,
      whereOperator: '=',
      whereEqual: whereData,
    };
    this.sendUpdate(modalForm, params, jsonData);
  }

  sendUpdate(modalForm: any, params: any, jsonData: any) {
    let message = '';
    // Llama al servicio para enviar los datos al servidor
    this.serviceApi.proccessUpdate(params, jsonData).subscribe({
      next: (response) => {
        this.responseMessage(modalForm, response);
      },
      error: (error) => {
        message = 'Error en la solicitud UPDATE de la API';
        console.error(message, error);
        this.modalOpen('modalSystem');
        this.modalSystemJson(message, error);
      },
      complete: () => (false),
    });
  }

  responseMessage(modalForm: any, response: any) {
    let message;
    if (response.data && Array.isArray(response.data)) {
      const respSuccess = response.data.some((item: any) => 'success' in item);
      if (respSuccess) { this.responseSuccess(modalForm, response); }
      const respWarnign = response.data.some((item: any) => 'warning' in item);
      if (respWarnign) { this.responseWarning(modalForm, response); }
      const respError = response.data.some((item: any) => 'error' in item);
      if (respError) { this.getDataError(response); }
    } else {
      message = 'No tiene un formato en array.';
      const swalOptions = {
        'swalMessage': message,
        'swalIcon': 'error',
        'swalTitle': 'Error',
      };
      this.swalFireMssg(swalOptions);
    }
  }

  responseSuccess(modalForm: any, response: any) {
    const { modalId, formId } = modalForm;
    expModalClose(modalId);
    expModalReset(formId);
    const answer = response.data
      .filter((item: any) => 'success' in item)
      .map((item: { success: any; }) => item.success)
      .join(', ');
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'success',
      title: `<h2>Completado!</h2>`,
    }).then(() => {
      this.dataProccess();
    });
  }

  formAjaxHide() {
    const formIdsAjax = [
      'formInsertAjax',
      'formUpdateAjax',
      'formDeleteAjax',
      'formRemoveAjax',
      'formRestoreAjax',
    ];

    formIdsAjax.forEach(formId => {
      const formAjax = document.getElementById(formId);
      if (formAjax) {
        formAjax.classList.add('d-none');
        formAjax.innerHTML = `<span></span>`;
      }
    });
  }

  responseWarning(modalForm: any, response: any) {
    let formAjaxId = '';
    const { modalId } = modalForm;
    const answer = response.data
      .filter((item: any) => 'warning' in item)
      .map((item: { warning: any; }) => item.warning)
      .join(', ');
    // Determinar el ID del formulario correspondiente al modal
    if (modalId === 'modalInsert') { formAjaxId = 'formInsertAjax'; }
    if (modalId === 'modalUpdate') { formAjaxId = 'formUpdateAjax'; }
    if (modalId === 'modalDelete') { formAjaxId = 'formDeleteAjax'; }
    if (modalId === 'modalRemove') { formAjaxId = 'formRemoveAjax'; }
    if (modalId === 'modalRestore') { formAjaxId = 'formRestoreAjax'; }

    if (formAjaxId) {
      // Agregar la clase de alerta
      const formAjax = document.getElementById(formAjaxId);
      if (formAjax) { formAjax.classList.remove('d-none'); }
      if (formAjax) { formAjax.innerHTML = `<span>${answer}</span>`; }
    }
  }

  dataProccess() {
    let timerInterval: any;
    Swal.fire({
      title: 'Procesando',
      html: 'Espere un momento...',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');

        if (b) {
          const timerLeft = Swal.getTimerLeft();
          if (timerLeft !== undefined) {
            b.textContent = timerLeft.toString();
          }
        }

        const alertBox = Swal.getPopup();
        if (alertBox) { alertBox.style.textAlign = 'center'; }

        timerInterval = setInterval(() => {
          const timerLeft = Swal.getTimerLeft();
          if (timerLeft !== undefined && b) {
            b.textContent = timerLeft.toString();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Puedes agregar un manejo adicional aquí si lo deseas */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.resultColumn(this.deletedData);
      }
    });
  }

  swalFireMssg(swalOptions: any) {
    const { swalMessage, swalIcon, swalTitle } = swalOptions;
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${swalMessage}</span>`,
      icon: swalIcon,
      title: `<h2>${swalTitle}!</h2>`,
    });
  }

  async resultRegister(params: any) {
    let message;
    const serviceResolve = await this.serviceApi.resolveRegister(params);
    if (serviceResolve.data && Array.isArray(serviceResolve.data)) {
      const hasErrors = serviceResolve.data.some((item: any) => 'error' in item);
      if (hasErrors) {
        message = 'Ocurrió un error en la solicitud';
        this.modalSystemData(message, serviceResolve);
      }
    } else {
      message = 'No tiene un formato en array.';
      const swalOptions = {
        'swalMessage': message,
        'swalIcon': 'error',
        'swalTitle': 'Error',
      };
      this.swalFireMssg(swalOptions);
    }
    return serviceResolve;
  }

  responseToken(response: any) {
    console.log(response);
    this.isLoading = false;
    const answer = response.data
    .filter((item: any) => 'error' in item)
    .map((item: { error: any; }) => item.error)
    .join(', ');
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'warning',
      title: `<h2>Advertencia!</h2>`,
    }).then(() => {
      this.actionLogout();
    });
  }

  moduleAccess() {
    this.isLoading = false;
    const answer = `Acceso de Modulo Denegado`;
    Swal.fire({
      allowOutsideClick: false,
      confirmButtonText: 'Entendido',
      customClass: { confirmButton: 'rounded-0', },
      html: `<span class="text-dark">${answer}</span>`,
      icon: 'warning',
      title: `<h2>Advertencia!</h2>`,
    }).then(() => {
      this.router.navigate(['internal/dashboard']);
    });
  }

  actionLogout() {
    this.modalClass();
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
}
