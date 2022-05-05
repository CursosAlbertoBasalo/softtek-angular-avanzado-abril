import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { UserValidatorsService } from 'src/app/auth/register/user-validators.service';
import { ValidatorsService } from '../validators.service';

@Component({
  selector: 'stk-email',
  templateUrl: './email.control.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailControl),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailControl implements OnInit, ControlValueAccessor {
  @Input() formControlName!: string;
  private emailValidators = [Validators.required, Validators.email];
  private emailAsyncValidators = [this.userValidators.emailFree()];

  private emailOptions: FormControlOptions = {
    updateOn: 'blur',
    validators: this.emailValidators,
    asyncValidators: this.emailAsyncValidators,
  };

  form: FormGroup = new FormGroup({
    email: new FormControl('', this.emailOptions),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customValidators: ValidatorsService,
    private readonly userValidators: UserValidatorsService
  ) {}

  public ngOnInit(): void {}
  public writeValue(value: any): void {
    value && this.form.setValue({ email: value }, { emitEvent: false });
  }

  public registerOnChange(changeCallback: any): void {
    this.form.valueChanges.subscribe(changeCallback);
  }

  touchedCallback: any;
  public registerOnTouched(touchedCallback: any): void {
    this.touchedCallback = touchedCallback;
  }
}
