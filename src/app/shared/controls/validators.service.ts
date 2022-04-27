import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  customPassword(control: AbstractControl): ValidationErrors | null {
    let errors: ValidationErrors | null = null;
    const value = control.value as string;
    if (value && value.startsWith('1')) {
      errors = { startsWithOne: true };
    }
    return errors;
  }

  matchValue(firstControlName: string, secondControlName: string): ValidatorFn {
    let validatorFunction: ValidatorFn;

    validatorFunction = (form: AbstractControl) => {
      let errors: ValidationErrors | null = null;
      const firstValue = form.get(firstControlName)?.value;
      const secondValue = form.get(secondControlName)?.value;
      if (firstValue !== secondValue) {
        errors = { noMatch: 'No coincide ' + firstValue + ' con ' + secondValue };
      }
      return errors;
    };

    return validatorFunction;
  }
  fromTo(fromControlName: string, toControlName: string): ValidatorFn {
    let validatorFunction: ValidatorFn;

    validatorFunction = (form: AbstractControl) => {
      let errors: ValidationErrors | null = null;
      const fromValue = form.get(fromControlName)?.value;
      const toValue = form.get(toControlName)?.value;
      if (fromValue > toValue) {
        errors = { noOrdered: true };
      }
      return errors;
    };

    return validatorFunction;
  }
}
