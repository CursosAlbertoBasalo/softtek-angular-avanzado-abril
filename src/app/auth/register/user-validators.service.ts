import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { User } from '@stk/models/user.interface';
import { UsersService } from '@stk/services/users.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserValidatorsService {
  constructor(private readonly users: UsersService) {}

  emailFree(): AsyncValidatorFn {
    const emailTakenError = { emailTaken: true };
    const emailFree = null;
    const validatorFunction: AsyncValidatorFn = (control: AbstractControl) => {
      const email = control.value;
      return this.users
        .getByEmail$(email)
        .pipe(map((users: User[]) => (users.length === 0 ? emailFree : emailTakenError)));
    };

    return validatorFunction;
  }
}
