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