/* */

function valGetElementById(elementId: string): HTMLElement | null {
  const element = document.getElementById(elementId);
  let errorMessage = `Elemento HTML con ID '${elementId}' no existe`;
  if (!element) { console.error(errorMessage); }
  return element;
}

export function expFormCollect(modalForm: any, formField: any) {
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

/* */

export function expModalClass() {
  // Buscar el elemento con las clases
  const modalBackdrop = document.querySelector('.modal-backdrop.fade.show');
  if (modalBackdrop) {
    modalBackdrop.remove();
    modalBackdrop.classList.remove(
      'modal-backdrop',
      'fade',
      'show'
    );
  }
}

export function expModalClose(modalForm: string) {
  // JavaScript para cerrar la ventana modal
  const miModal = document.getElementById(modalForm);
  if (miModal) { miModal.style.display = 'none'; }
  expModalClass();
}

export function expModalReset(modalForm: string) {
  const formulario = document.getElementById(modalForm) as HTMLFormElement;
  // Verificar si el formulario existe y es un elemento de formulario antes de resetearlo
  if (formulario && formulario instanceof HTMLFormElement) { formulario.reset(); }
}

/* */

export function expModalMapData(modal: any, service: any) {
  const data = service.data[0];
  if (!data) { return; }
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const fieldHtml = document.querySelector(`#${modal}_${key}`);
      if (fieldHtml instanceof HTMLInputElement) {
        handleInputField(fieldHtml, data[key]);
      }
      if (fieldHtml instanceof HTMLSelectElement) {
        handleSelectField(fieldHtml, data[key]);
      }
    }
  }
}

function handleInputField(inputElement: HTMLInputElement, value: any) {
  inputElement.value = value || '';
}

function handleSelectField(selectElement: HTMLSelectElement, value: any) {
  const valueToSelect = (value || '').trim().toLowerCase();
  const options = Array.from(selectElement.options);
  for (const option of options) {
    const optionValue = option.value.trim().toLowerCase();
    if (optionValue === valueToSelect) {
      option.selected = true;
      break;
    }
  }
}
