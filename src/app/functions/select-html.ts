// Importacion de Funciones Generales
import { expRplPrefixString } from 'src/app/functions/replace-prefix';

export function expSelectHtmlIds() {
  let modalIds = ['modalInsert', 'modalUpdate'];
  let prefixes = ['insert_', 'update_'];
  let idHtmlSet = new Set<string>();
  for (let i = 0; i < modalIds.length; i++) {
    const modalItem = modalIds[i];
    const modalElement = document.getElementById(modalItem);
    if (modalElement) {
      const prefix = prefixes[i];
      // Obtén los valores de idHtml y agrega los valores únicos al Set
      selectHtmlCharge(modalElement, prefix).forEach((value) => {
        idHtmlSet.add(value);
      });
    }
  }
  // Convierte el Set en un array de strings
  const idHtmlValues = Array.from(idHtmlSet);
  return { prefixes, idHtmlValues };
}

function selectHtmlCharge(modalForm: any, modalPrefix: any) {
  // Busca todos los elementos <select> dentro del modal
  const selectElements = modalForm.querySelectorAll('select') as HTMLSelectElement[];
  // Itera sobre los elementos <select> y obtén sus atributos id
  const idHtml = Array.from(selectElements).map((item) =>
    expRplPrefixString(item.id, modalPrefix)
  );
  return idHtml;
}

export function expSelectHtmlMap(modalPrefixes: string[], params: any, response: any) {
  // Compara params.htmlSelect con response.query_params.htmlSelect
  if (params.htmlSelect === response.query_params.htmlSelect) {
    const selectElements: HTMLSelectElement[] = [];
    // Recorre los prefijos y crea las combinaciones
    for (const prefix of modalPrefixes) {
      const prefixComb = `${prefix}${params.htmlSelect}`;
      const elements: HTMLSelectElement[] = Array.from(
        document.querySelectorAll(`select[id^="${prefixComb}"]`)
      );
      selectElements.push(...elements);
    }
    selectElements.forEach((selectElement) => {
      // Limpia las opciones actuales del select
      selectElement.innerHTML = '';
      // Agregar la opción "Seleccionar Registro"
      const selectPromptOption = document.createElement('option');
      selectPromptOption.value = '';
      selectPromptOption.textContent = 'Seleccionar Registro';
      selectElement.appendChild(selectPromptOption);
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Si hay datos, agrega las opciones
        response.data.forEach((item: any) => {
          const option = document.createElement('option');
          option.value = item.id_register;
          option.textContent = item.os_name;
          selectElement.appendChild(option);
        });
      } else {
        // Si no hay datos, agrega la opción "Sin Resultados"
        const noResultsOption = document.createElement('option');
        noResultsOption.value = '';
        noResultsOption.textContent = 'Sin Resultados';
        selectElement.appendChild(noResultsOption);
      }
    });
  }
}