import { Component, OnInit } from '@angular/core';
import { RoleModule } from 'src/app/models/role.interface';
import { ApiService } from 'src/app/services/api/api.service';
import { RoleService } from 'src/app/services/role/role.service';

import { forkJoin } from 'rxjs';

declare let $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor (
    private serviceApi: ApiService,
    private serviceRole: RoleService,
  ) {}

  roleData: RoleModule[] = [];

  ngOnInit(): void {
    this.getSelect();
  }

  getSelect() {
    this.serviceRole.getSelect().subscribe({
      next: (response: any) => {
        console.log(response);
        // Mapea los datos del servicio al formato esperado
        this.roleData = response.result.map((item: any) => ({
          idRole: parseInt(item.id_role, 10),
          name: item.name,
        }));
        console.log(this.roleData);
        this.getTable();
      },
      error: (err: any) => console.error(err),
      complete: () => (false),
    });
  }

  getTable() {
    const columnSet = [
      {
        title: "Id",
        id: "idRole",
        data: "idRole",
        type: "text",
        className: "text-dark",
        visible: true,
      },
      {
        title: "Nombre",
        id: "name",
        data: "name",
        type: "text",
        className: "text-dark",
        visible: true,
      },
    ];

    $('#dt_info').DataTable({
      destroy: true,
      dom: "<'row mb-2'<'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center'B>>" +
        "<'row mb-2'<'col-xs-12 col-sm-12 col-md-5 col-lg-4 col-xl-4'i><'col-xs-12 col-sm-12 col-md-7 col-lg-8 col-xl-8'p>>" +
        "<'row mb-2'<'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'tr>>",
      data: this.roleData,
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
          text: '<em class="far fa-plus"></em> <span>Nuevo</span>',
          titleAttr: 'Nuevo',
          className: 'rounded-0 btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_create',
            'name': 'table_btn_create',
            'data-toggle': 'modal',
            'data-target': '.modal-div-create',
          },
        },
        {
          text: '<em class="far fa-edit"></em> <span>Actualizar</span>',
          titleAttr: 'Actualizar',
          className: 'rounded-0 btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_update',
            'name': 'table_btn_update',
            'onclick': 'modal_update();',
          },
        },
        {
          text: '<em class="far fa-redo-alt"></em> <span>Restaurar</span>',
          titleAttr: 'Restaurar',
          className: 'rounded-0 btn-sm btn-outline-warning',
          attr: {
            'id': 'table_btn_restore',
            'name': 'table_btn_restore',
            'onclick': 'modal_restore();',
          },
        },
        {
          text: '<em class="far fa-trash"></em> <span>Remover</span>',
          titleAttr: 'Remover',
          className: 'rounded-0 btn-sm btn-outline-warning',
          attr: {
            'id': 'table_btn_remove',
            'name': 'table_btn_remove',
            'onclick': 'modal_remove();',
          },
        },
        {
          text: '<em class="far fa-trash-alt"></em> <span>Eliminar</span>',
          titleAttr: 'Eliminar',
          className: 'rounded-0 btn-sm btn-outline-danger',
          attr: {
            'id': 'table_btn_delete',
            'name': 'table_btn_delete',
            'onclick': 'modal_delete();',
          },
        },
        {
          text: '<em class="far fa-exchange-alt"></em> <span>Cambios</span>',
          titleAttr: 'Cambios',
          className: 'rounded-0 btn-sm btn-outline-dark',
          attr: {
            'id': 'table_btn_change',
            'name': 'table_btn_change',
            'onclick': 'modal_change();',
          },
        },
        {
          text: '<em class="far fa-align-center"></em> <span>Detalles</span>',
          titleAttr: 'Detalles',
          className: 'rounded-0 btn-sm btn-outline-dark',
          attr: {
            'id': 'table_btn_detail',
            'name': 'table_btn_detail',
            'onclick': 'modal_detail();',
          },
        },
        /*{
          text: '<em class="far fa-sync"></em> <span>Sincronizar</span>',
          titleAttr: 'Sincronizar',
          name: 'rounded-0 refresh',
          className: 'btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_sync',
            'name': 'table_btn_sync',
          },
        },*/
        /*{
          extend: 'copyHtml5',
          text: '<em class="far fa-copy"></em> <span>Copiar</span>',
          titleAttr: 'Copiar',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_copy',
            'name': 'table_btn_copy',
          },
        },
        {
          extend: 'pdfHtml5',
          text: '<em class="far fa-file-pdf"></em> <span>PDF</span>',
          titleAttr: 'PDF',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_pdf',
            'name': 'table_btn_pdf',
          },
        },
        {
          extend: 'excelHtml5',
          text: '<em class="far fa-file-excel"></em> <span>Excel</span>',
          titleAttr: 'Excel',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_excel',
            'name': 'table_btn_excel',
          },
        },
        {
          extend: 'csvHtml5',
          text: '<em class="far fa-file-csv"></em> <span>CSV</span>',
          titleAttr: 'CSV',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_csv',
            'name': 'table_btn_csv',
          },
        },
        {
          autoPrint: true,
          extend: 'print',
          text: '<em class="far fa-print"></em> <span>Imprimir</span>',
          titleAttr: 'Imprimir',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_print',
            'name': 'table_btn_print',
          },
        },
        {
          columns: [1, 2, 3, 4, 5],
          extend: 'columnToggle',
          text: '<em class="far fa-low-vision"></em> <span>Extender</span>',
          titleAttr: 'Extender',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_column_toggle',
            'name': 'table_btn_column_toggle',
          },
        },
        {
          extend: 'colvisRestore',
          text: '<em class="far fa-low-vision"></em> <span>Restaurar</span>',
          titleAttr: 'Restaurar',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_colvis_restore',
            'name': 'table_btn_colvis_restore',
          },
        },
        {
          extend: 'colvis',
          text: '<em class="far fa-low-vision"></em> <span>Visible</span>',
          titleAttr: 'Visible',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_colvis_column',
            'name': 'table_btn_colvis_column',
          },
        },
        {
          extend: 'pageLength',
          text: '<em class="far fa-database"></em> <span>Mostrar</span>',
          titleAttr: 'Mostrar',
          className: 'rounded-0 d-none btn-sm btn-outline-success',
          attr: {
            'id': 'table_btn_page_length',
            'name': 'table_btn_page_length',
          },
        },*/
      ],
    });
  }
}
