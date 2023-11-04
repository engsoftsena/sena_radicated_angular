export function expTableRegister() {
  tableDataBtn('remove', 'modalInsertBtn');
  tableDataBtn('remove', 'modalUpdateBtn');
  tableDataBtn('remove', 'modalRemoveBtn');
  tableDataBtn('append', 'modalRestoreBtn');
  tableDataBtn('append', 'modalDeleteBtn');
}

export function expTableRemove() {
  tableDataBtn('append', 'modalInsertBtn');
  tableDataBtn('append', 'modalUpdateBtn');
  tableDataBtn('append', 'modalRemoveBtn');
  tableDataBtn('remove', 'modalRestoreBtn');
  tableDataBtn('remove', 'modalDeleteBtn');
}

function tableDataBtn(classList: any, reference: any) {
  let btnData = document.getElementById(reference) as HTMLFormElement;
  if (classList == 'append') { btnData.classList.add('d-none'); }
  if (classList == 'remove') { btnData.classList.remove('d-none'); }
}