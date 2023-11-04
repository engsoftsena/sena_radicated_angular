export function fncFormCollect(modalForm: any, formField: any) {
  const { formId, formPrefix } = modalForm;
  const formData: { [key: string]: string } = {};

  let valFormId = valGetElementById(formId);
  if (!valFormId) { return formData }

  let valformField = valGetElementById(formField);
  if (!valformField) { return formData }

  const allElements = Array.from(valformField.querySelectorAll('*'));
  for (const element of allElements) {
    if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
      const fieldName = element.getAttribute('name');
      if (fieldName) {
        const lizedField = fieldName.replace(formPrefix, '');
        formData[lizedField] = element.value;
      } else {
        console.error('No existe la propiedad name');
      }
    }
  }
  return formData;
}

function valGetElementById(elementId: string): HTMLElement | null {
  const element = document.getElementById(elementId);
  let errorMessage = `Elemento HTML con ID '${elementId}' no existe`;
  if (!element) { console.error(errorMessage); }
  return element;
}
