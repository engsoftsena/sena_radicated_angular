import { Injectable } from '@angular/core';

declare let $: any;

@Injectable({
  providedIn: 'root'
})
export class TableService {
  getTable(
    reference: any,
    dataApi: any,
    columnSet: any,
    buttons: { [s: string]: unknown; } | ArrayLike<unknown>
  ) {
    // Inicializar tabla de datos
    let tableLoad = $(`#${reference}`).DataTable({
      // Opciones para crear, editar, borrar y sincronizar
      altEditor: true,
      // Combinar valores en las demas celdas
      autoFill: false,
      // Control de funciones Manejo inteligente del ancho de columna
      autoWidth: true,
      // Botones que usan clases de bootstrap
      buttons: Object.values(buttons),
      // Movilizar columnas en la tabla
      colReorder: true,
      // Establecer propiedades de inicialización de definición de columna.
      columnDefs: [],
      // Cargar columnas del encabezado
      columns: columnSet,
      // Setear la data recibida de la api
      data: this.processApiData(dataApi),
      // Creará todos los elementos HTML necesarios por adelantado
      deferRender: true,
      // Reinicialiar los datos de la tabla
      destroy: true,
      // Estructura de las columnas para el DOOM
      dom: this.configDom().join(''),
      // Fijar columnas en la tabla
      fixedColumns: false,
      // Fijar columnas en la parte superior de la tabla
      fixedHeader: true,
      // Mostrar entradas de los registros
      info: true,
      // Focalizar una celda de la tabla
      keys: false,
      // Lenguaje de la tabla
      language: this.configLanguage(),
      // Cambiar numero de registros por pagina
      lengthChange: false,
      // Definir cantidad de registros por paginacion
      lengthMenu: [
        [100, 200, 300, 400, 500, -1,],
        [100, 200, 300, 400, 500, 'Todo',],
      ],
      // Ordenar columnas en ascendente o descendente
      order: [
        [0, 'desc',]
      ],
      // Controlar si las tablas de datos deben usar celda única superior
      orderCellsTop: true,
      // Ordenar segun columna los registros
      ordering: true,
      // Paginar registros limitadamente
      paging: true,
      // Habilitar botones extras en el paginado
      pagingType: this.configPaginType(),
      // Procesando informacion de registros
      processing: true,
      // Control para el tamaño de la tabla de datos
      responsive: false,
      // Agrupar las filas de los registros
      rowGroup: false,
      // Control de busqueda de registros
      searching: true,
      // Selccionar varias filas de registro
      select: 'single',
      // Procesamiento del lado del servidor
      serverSide: false,
      // Control para el desplazamiento medido de arriba abajo
      scrollCollapse: true,
      // Permite dibujar grandes conjuntos de datos en la pantalla muy rápidamente
      scroller: false,
      // Control para el desplazamiento de derecha a izquiera
      scrollX: true,
      // Control para el desplazamiento medido de arriba abajo
      scrollY: 380,
      // Guardar el estado de una tabla (su posición de paginación, estado de pedido, etc.)
      stateSave: false,
    });

    // Agregar un oyente de eventos para el evento 'draw.dt'
    tableLoad.on('draw.dt', function() {});
  }

  adjustColumns(tableId: string) {
    const table = $(`#${tableId}`).DataTable();
    table.columns.adjust().draw();
  }

  processApiData(dataApi: any) {
    return dataApi.map((item: any) => {
      Object.keys(item).forEach(key => {
        if (!isNaN(item[key])) {
          item[key] = parseFloat(item[key]);
        }
      });
      return item;
    });
  }

  configDom() {
    const domButton = this.domButton();
    const domResult = this.domResult();
    const domRow = this.domRow();
    return [domButton, domResult, domRow];
  }

  configLanguage() {
    return {
      aria: {
        sortAscending: ': activate to sort column ascending',
        sortDescending: ': activate to sort column descending',
      },
      decimal: '',
      emptyTable: 'Sin Datos',
      info: 'Registros (Del _START_ Al _END_) Total De _TOTAL_ Registros',
      infoEmpty: 'Registros (Del 0 Al 0) Total De 0 Registros',
      infoFiltered: '(Filtrados del Total de _MAX_ Registros)',
      infoPostFix: '',
      lengthMenu: 'Mostrar _MENU_ Registros Por Página',
      loadingRecords: 'Cargando...',
      paginate: {
        first: 'Primera',
        last: 'Última',
        next: 'Siguiente',
        previous: 'Anterior',
      },
      processing: 'Procesando...',
      search: 'Filtrar:',
      thousands: ',',
      zeroRecords: 'No se encontrados registros segun el filtrado.',
    };
  }

  configPaginType() {
    //DataTables has six built-in paging button arrangements:
    //numbers - Page number buttons only (1.10.8)
    //simple - 'Previous' and 'Next' buttons only
    //simple_numbers - 'Previous' and 'Next' buttons, plus page numbers
    //full - 'First', 'Previous', 'Next' and 'Last' buttons
    //full_numbers - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
    //first_last_numbers - 'First' and 'Last' buttons, plus page numbers
    return 'full';
  }

  domButton() {
    return `
      <'row mb-1'
        <'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 align-items-center'
          <'panel rounded-0 mb-1'
            <'panel-container show'
              <'panel-content p-0'
                <'panel-tag p-1 bg-white'
                  B
                >
              >
            >
          >
        >
      >
    `;
  }

  domResult() {
    return `
      <'row mb-1'
        <'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-5 align-items-center text-center'
          <'panel rounded-0 mb-1'
            <'panel-container show'
              <'panel-content p-0'
                <'panel-tag p-1 bg-white'
                  <'span color-fusion-900'
                    i
                  >
                >
              >
            >
          >
        >
        <'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-7 align-items-center'
          <'panel rounded-0 mb-1'
            <'panel-container show'
              <'panel-content p-0'
                <'panel-tag p-1 bg-white'
                  p
                >
              >
            >
          >
        >
      >
    `;
  }

  domRow() {
    return `
      <'row mb-1'
        <'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
          tr
        >
      >
    `;
  }
}
