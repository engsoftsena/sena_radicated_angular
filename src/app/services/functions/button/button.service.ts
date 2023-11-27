import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  // Crear un EventEmitter para abrir el modal
  openModalDelete: EventEmitter<void> = new EventEmitter<void>();
  openModalInsert: EventEmitter<void> = new EventEmitter<void>();
  openModalRemove: EventEmitter<void> = new EventEmitter<void>();
  openModalRestore: EventEmitter<void> = new EventEmitter<void>();
  openModalUpdate: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  buttonDataAction() {
    return [
      this.btnActionCreate(),
      this.btnActionUpdate(),
      this.btnActionRestore(),
      this.btnActionRemove(),
      this.btnActionDelete(),
      this.btnButtonChange(),
      this.btnButtonDetail(),
    ];
  };

  buttonDataExport() {
    return [
      this.btnExportCopy(),
      this.btnExportPdf(),
      this.btnExportExcel(),
      this.btnExportCsv(),
      this.btnExportPrint(),
    ];
  };

  buttonFielAction() {
    return [
      //this.btnFileUpload(),
    ];
  };

  btnActionCreate() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnActionCreate',
        'name': 'tblBtnActionCreate',
        'data-toggle': 'modal',
        'data-target': '.modal-insert',
        'onclick': () => {
          this.openModalInsert.emit();
        },
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-success',
      text: '<em class="far fa-plus"></em> <span class="hidden-sm-down">Nuevo</span>',
      titleAttr: 'Nuevo',
    },);
    return buttons;
  };

  btnActionUpdate() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnActionUpdate',
        'name': 'tblBtnActionUpdate',
        'data-toggle': 'modal',
        'data-target': '.modal-update',
        'onclick': () => {
          this.openModalUpdate.emit();
        },
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-success',
      text: '<em class="far fa-edit"></em> <span class="hidden-sm-down">Editar</span>',
      titleAttr: 'Editar',
    },);
    return buttons;
  };

  btnActionRestore() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnActionRestore',
        'name': 'tblBtnActionRestore',
        'data-toggle': 'modal',
        'data-target': '.modal-restore',
        'onclick': () => {
          this.openModalRestore.emit();
        },
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-warning',
      text: '<em class="far fa-redo-alt"></em> <span class="hidden-sm-down">Restaurar</span>',
      titleAttr: 'Restaurar',
    },);
    return buttons;
  };

  btnActionRemove() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnActionRemove',
        'name': 'tblBtnActionRemove',
        'data-toggle': 'modal',
        'data-target': '.modal-remove',
        'onclick': () => {
          this.openModalRemove.emit();
        },
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-warning',
      text: '<em class="far fa-trash"></em> <span class="hidden-sm-down">Remover</span>',
      titleAttr: 'Remover',
    },);
    return buttons;
  };

  btnActionDelete() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnActionDelete',
        'name': 'tblBtnActionDelete',
        'data-toggle': 'modal',
        'data-target': '.modal-delete',
        'onclick': () => {
          this.openModalDelete.emit();
        },
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-danger',
      text: '<em class="far fa-trash-alt"></em> <span class="hidden-sm-down">Eliminar</span>',
      titleAttr: 'Eliminar',
    },);
    return buttons;
  };

  btnButtonChange() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnChange',
        'name': 'tblBtnChange',
        'onclick': 'modal_change();',
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-primary',
      text: '<em class="far fa-exchange-alt"></em> <span class="hidden-sm-down">Cambios</span>',
      titleAttr: 'Cambios',
    },);
    return buttons;
  };

  btnButtonDetail() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnDetail',
        'name': 'tblBtnDetail',
        'onclick': 'detailModal();',
      },
      className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-dark',
      text: '<em class="far fa-align-center"></em> <span class="hidden-sm-down">Detalles</span>',
      titleAttr: 'Detalles',
    },);
    return buttons;
  };

  btnExportCopy() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnExportCopy',
        'name': 'tblBtnExportCopy',
      },
      className: 'btnsExports rounded-0 mb-1 btn-sm btn-outline-dark',
      extend: 'copyHtml5',
      text: '<em class="far fa-copy"></em> <span class="hidden-sm-down">Copiar</span>',
      titleAttr: 'Copiar',
    },);
    return buttons;
  };

  btnExportPdf() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnExportPdf',
        'name': 'tblBtnExportPdf',
      },
      className: 'btnsExports rounded-0 mb-1 btn-sm btn-outline-danger',
      extend: 'pdfHtml5',
      text: '<em class="far fa-file-pdf"></em> <span class="hidden-sm-down">PDF</span>',
      titleAttr: 'PDF',
    },);
    return buttons;
  };

  btnExportExcel() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnExportExcel',
        'name': 'tblBtnExportExcel',
      },
      className: 'btnsExports rounded-0 mb-1 btn-sm btn-outline-success',
      extend: 'excelHtml5',
      text: '<em class="far fa-file-excel"></em> <span class="hidden-sm-down">Excel</span>',
      titleAttr: 'Excel',
    },);
    return buttons;
  };

  btnExportCsv() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnExportCsv',
        'name': 'tblBtnExportCsv',
      },
      className: 'btnsExports rounded-0 mb-1 btn-sm btn-outline-info',
      extend: 'csvHtml5',
      text: '<em class="far fa-file-csv"></em> <span class="hidden-sm-down">CSV</span>',
      titleAttr: 'CSV',
    },);
    return buttons;
  };

  btnExportPrint() {
    let buttons = [];
    buttons.push({
      attr: {
        'id': 'tblBtnExportPrint',
        'name': 'tblBtnExportPrint',
      },
      autoPrint: true,
      className: 'btnsExports rounded-0 mb-1 btn-sm  btn-outline-primary',
      extend: 'print',
      text: '<em class="far fa-print"></em> <span class="hidden-sm-down">Imprimir</span>',
      titleAttr: 'Imprimir',
    },);
    return buttons;
  };
}
