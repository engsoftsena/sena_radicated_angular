import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  // Crear un EventEmitter para abrir el modal
  openModalEvent: EventEmitter<void> = new EventEmitter<void>();

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
      //this.btnExportCopy(),
      //this.btnExportPdf(),
      //this.btnExportExcel(),
      //this.btnExportCsv(),
      //this.btnExportPrint(),
    ];
  };

  buttonFielAction() {
    return [
      //this.btnFileUpload(),
    ];
  };

  btnActionCreate() {
    let buttons = [];
    //if (pmt_action_create) {
      buttons.push({
        attr: {
          'id': 'tblBtnActionCreate',
          'name': 'tblBtnActionCreate',
          'data-toggle': 'modal',
          'data-target': '.modal-insert',
          'onclick': () => {
            this.openModalEvent.emit();
          },
        },
        className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-success',
        text: '<em class="far fa-plus"></em> <span class="hidden-sm-down">Nuevo</span>',
        titleAttr: 'Nuevo',
      },);
    //}
    return buttons;
  };

  btnActionUpdate() {
    let buttons = [];
    //if (pmt_action_update) {
      buttons.push({
        attr: {
          'id': 'tblBtnActionUpdate',
          'name': 'tblBtnActionUpdate',
          'data-toggle': 'modal',
          'data-target': '.modal-update',
          'onclick': () => {
            this.openModalEvent.emit();
          },
        },
        className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-success',
        text: '<em class="far fa-edit"></em> <span class="hidden-sm-down">Editar</span>',
        titleAttr: 'Editar',
      },);
    //}
    return buttons;
  };

  btnActionRestore() {
    let buttons = [];
    //if (pmt_action_restore) {
      buttons.push({
        attr: {
          'id': 'tblBtnActionRestore',
          'name': 'tblBtnActionRestore',
          'data-toggle': 'modal',
          'data-target': '.modal-restore',
          'onclick': () => {
            this.openModalEvent.emit();
          },
        },
        className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-warning',
        text: '<em class="far fa-redo-alt"></em> <span class="hidden-sm-down">Restaurar</span>',
        titleAttr: 'Restaurar',
      },);
    //}
    return buttons;
  };

  btnActionRemove() {
    let buttons = [];
    //if (pmt_action_remove) {
      buttons.push({
        attr: {
          'id': 'tblBtnActionRemove',
          'name': 'tblBtnActionRemove',
          'data-toggle': 'modal',
          'data-target': '.modal-remove',
          'onclick': () => {
            this.openModalEvent.emit();
          },
        },
        className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-warning',
        text: '<em class="far fa-trash"></em> <span class="hidden-sm-down">Remover</span>',
        titleAttr: 'Remover',
      },);
    //}
    return buttons;
  };

  btnActionDelete() {
    let buttons = [];
    //if (pmt_action_delete) {
      buttons.push({
        attr: {
          'id': 'tblBtnActionDelete',
          'name': 'tblBtnActionDelete',
          'data-toggle': 'modal',
          'data-target': '.modal-delete',
          'onclick': () => {
            this.openModalEvent.emit();
          },
        },
        className: 'btnsActions rounded-0 mb-1 btn-sm btn-outline-danger',
        text: '<em class="far fa-trash-alt"></em> <span class="hidden-sm-down">Eliminar</span>',
        titleAttr: 'Eliminar',
      },);
    //}
    return buttons;
  };

  btnButtonChange() {
    let buttons = [];
    //if (pmt_button_change) {
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
    //}
    return buttons;
  };

  btnButtonDetail() {
    let buttons = [];
    //if (pmt_button_detail) {
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
    //}
    return buttons;
  };
}
