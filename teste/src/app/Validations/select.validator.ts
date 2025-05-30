import { AbstractControl } from '@angular/forms';

export function validatePhone(control: AbstractControl) {
  const valor = control.value.toString().replace(/\s/g, '');
  if (valor != '') {
    if (valor.length < 10) return { invalid: true };
    else return null;
  } else return null;
}
