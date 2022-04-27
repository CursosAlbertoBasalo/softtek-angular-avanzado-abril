import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from '@stk/shared/controls/validators.service';
import { UserValidatorsService } from '../user-validators.service';

@Component({
  selector: 'stk-register',
  templateUrl: './register.form.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterForm implements OnInit {
  form: FormGroup;
  private emailValidators = [Validators.required, Validators.email];
  private emailAsyncValidators = [this.userValidators.emailFree()];
  private emailOptions: FormControlOptions = {
    updateOn: 'blur',
    validators: this.emailValidators,
    asyncValidators: this.emailAsyncValidators,
  };
  private passwordValidators = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(10),
    this.customValidators.customPassword,
  ];
  private formValidators = [this.customValidators.matchValue('password', 'passwordConfirmation')];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customValidators: ValidatorsService,
    private readonly userValidators: UserValidatorsService
  ) {
    this.form = formBuilder.group(
      {
        email: new FormControl('', this.emailOptions),
        password: new FormControl('', this.passwordValidators),
        passwordConfirmation: new FormControl('', this.passwordValidators),
      },
      {
        validators: this.formValidators,
      }
    );
  }

  ngOnInit(): void {}
}
