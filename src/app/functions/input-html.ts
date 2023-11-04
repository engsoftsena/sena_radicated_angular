export function fncInputChange(inputId: string, value: string) {
  const inputElement = document.getElementById(inputId) as HTMLInputElement;
  if (inputElement) { inputElement.value = value; }
}
