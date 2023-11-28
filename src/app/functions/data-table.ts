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

function tableDataBtn(listClass: any, reference: any) {
  let btnData = document.getElementById(reference) as HTMLButtonElement;
  if (btnData && listClass == 'append') { btnData.classList.add('d-none'); }
  if (btnData && listClass == 'remove') { btnData.classList.remove('d-none'); }
}