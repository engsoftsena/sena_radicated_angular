import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any; // Declarar la variable global jQuery

@Component({
  selector: 'app-tg-user-data',
  templateUrl: './tg-user-data.component.html',
  styleUrls: ['./tg-user-data.component.scss']
})
export class TgUserDataComponent implements AfterViewInit, OnInit {
  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const columnSet = [
        {
          title: "Id",
          id: "lbl_tg_user_data_aa_identifier",
          data: "lbl_tg_user_data_aa_identifier",
          type: "text",
          className: "text-dark",
          visible: true,
        },
        {
          title: "Correo Electronico",
          id: "lbl_tg_user_data_ac_email",
          data: "lbl_tg_user_data_ac_email",
          type: "text",
          className: "text-dark",
          visible: true,
        },
        {
          title: "Usuario",
          id: "lbl_tg_user_data_ac_login",
          data: "lbl_tg_user_data_ac_login",
          type: "text",
          className: "text-dark",
          visible: true,
        },
      ];

      const data = this.generateRandomData(50);

      $('#dt_info').DataTable({
        destroy: true,
        dom: "<'row mb-2'<'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center'B>>" +
          "<'row mb-2'<'col-xs-12 col-sm-12 col-md-5 col-lg-4 col-xl-4'i><'col-xs-12 col-sm-12 col-md-7 col-lg-8 col-xl-8'p>>" +
          "<'row mb-2'<'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'tr>>",
        /*ajax: {
          cache: true,
          dataType: 'json',
          dataSrc: 'data',
          deferRender: true,
          type: 'GET',
          url: endpoint,
        },*/
        data: data,
        columns: columnSet,
        altEditor: true,
        autoWidth: true,
        colReorder: true,
        columnDefs: [],
        deferRender: true,
        fixedHeader: true,
        info: true,
        lengthChange: true,
        lengthMenu: [
          [10, 20, 30, 40, 50, -1],
          [10, 20, 30, 40, 50, 'Todo'],
        ],
        order: [
          [0, 'desc']
        ],
        orderCellsTop: true,
        ordering: true,
        paging: true,
        pagingType: 'full_numbers',
        processing: true,
        responsive: false,
        scrollCollapse: true,
        scrollX: true,
        scrollY: 425,
        stateSave: false,
        buttons: [
          {
            text: '<em class="far fa-layer-group"></em>',
            titleAttr: 'Sub Menu',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_sub_menu',
              'name': 'table_btn_sub_menu',
              'data-toggle': 'modal',
              'data-target': '.modal-div-sub-menu',
            },
          },
          {
            text: '<em class="far fa-chart-bar"></em>',
            titleAttr: 'Reportes',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_report',
              'name': 'table_btn_report',
              'data-toggle': 'modal',
              'data-target': '.modal-div-report',
            },
          },
          {
            text: '<em class="far fa-plus"></em>',
            titleAttr: 'Nuevo',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_create',
              'name': 'table_btn_create',
              'data-toggle': 'modal',
              'data-target': '.modal-div-create',
            },
          },
          {
            text: '<em class="far fa-edit"></em>',
            titleAttr: 'Actualizar',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_update',
              'name': 'table_btn_update',
              'onclick': 'modal_update();',
            },
          },
          {
            text: '<em class="far fa-redo-alt"></em>',
            titleAttr: 'Restaurar',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_restore',
              'name': 'table_btn_restore',
              'onclick': 'modal_restore();',
            },
          },
          {
            text: '<em class="far fa-trash"></em>',
            titleAttr: 'Remover',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_remove',
              'name': 'table_btn_remove',
              'onclick': 'modal_remove();',
            },
          },
          {
            text: '<em class="far fa-trash-alt"></em>',
            titleAttr: 'Eliminar',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_delete',
              'name': 'table_btn_delete',
              'onclick': 'modal_delete();',
            },
          },
          {
            text: '<em class="far fa-exchange-alt"></em>',
            titleAttr: 'Cambios',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_change',
              'name': 'table_btn_change',
              'onclick': 'modal_change();',
            },
          },
          {
            text: '<em class="far fa-align-center"></em>',
            titleAttr: 'Detalles',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_detail',
              'name': 'table_btn_detail',
              'onclick': 'modal_detail();',
            },
          },
          {
            text: '<em class="far fa-sync"></em>',
            titleAttr: 'Sincronizar',
            name: 'refresh',
            className: 'btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_sync',
              'name': 'table_btn_sync',
            },
          },
          {
            extend: 'copyHtml5',
            text: '<em class="far fa-copy"></em>',
            titleAttr: 'Copiar',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_copy',
              'name': 'table_btn_copy',
            },
          },
          {
            extend: 'pdfHtml5',
            text: '<em class="far fa-file-pdf"></em>',
            titleAttr: 'PDF',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_pdf',
              'name': 'table_btn_pdf',
            },
          },
          {
            extend: 'excelHtml5',
            text: '<em class="far fa-file-excel"></em>',
            titleAttr: 'Excel',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_excel',
              'name': 'table_btn_excel',
            },
          },
          {
            extend: 'csvHtml5',
            text: '<em class="far fa-file-csv"></em>',
            titleAttr: 'CSV',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_csv',
              'name': 'table_btn_csv',
            },
          },
          {
            autoPrint: true,
            extend: 'print',
            text: '<em class="far fa-print"></em>',
            titleAttr: 'Imprimir',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_print',
              'name': 'table_btn_print',
            },
          },
          {
            columns: [1, 2, 3, 4, 5],
            extend: 'columnToggle',
            text: '<em class="far fa-low-vision"></em>',
            titleAttr: 'Extender',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_column_toggle',
              'name': 'table_btn_column_toggle',
            },
          },
          {
            extend: 'colvisRestore',
            text: '<em class="far fa-low-vision"></em>',
            titleAttr: 'Restaurar',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_colvis_restore',
              'name': 'table_btn_colvis_restore',
            },
          },
          {
            extend: 'colvis',
            text: '<em class="far fa-low-vision"></em>',
            titleAttr: 'Visible',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_colvis_column',
              'name': 'table_btn_colvis_column',
            },
          },
          {
            extend: 'pageLength',
            text: '<em class="far fa-database"></em>',
            titleAttr: 'Mostrar',
            className: 'd-none btn-sm btn-outline-success',
            attr: {
              'id': 'table_btn_page_length',
              'name': 'table_btn_page_length',
            },
          },
        ],
      });
    }, 0);
  }

  ngOnInit(): void {}

  // Función para generar datos aleatorios
  generateRandomData(count: number) {
    const data = [];

    for (let i = 0; i < count; i++) {
      const id = i + 1;
      const email = this.generateRandomEmail();
      const username = this.generateRandomUsername();

      const rowData = {
        lbl_tg_user_data_aa_identifier: id,
        lbl_tg_user_data_ac_email: email,
        lbl_tg_user_data_ac_login: username
      };

      data.push(rowData);
    }

    console.log('data', data);

    return data;
  }

  // Función para generar un correo electrónico aleatorio
  generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const username = this.generateRandomUsername();
    return `${username}@${randomDomain}`;
  }

  // Función para generar un nombre de usuario aleatorio
  generateRandomUsername() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      username += characters.charAt(randomIndex);
    }

    return username;
  }
}
