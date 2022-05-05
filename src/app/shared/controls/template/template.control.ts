import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'stk-template',
  templateUrl: './template.control.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TemplateControl),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateControl implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() type: 'password' | 'text' = 'text';
  @Input() formControlName!: string;
  @Input() form!: FormGroup;
  public value: any;
  private changedCallback!: (value: any) => {};
  private touchedCallback!: () => {};

  constructor() {}

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(changeCallback: any): void {
    this.changedCallback = changeCallback;
  }
  registerOnTouched(touchedCallback: any): void {
    this.touchedCallback = touchedCallback;
  }

  ngOnInit(): void {}
  onBlur() {
    this.touchedCallback();
  }

  onChange(event: any) {
    this.value = event.target.value;
    this.changedCallback(this.value);
    this.touchedCallback();
  }

  isInvalid(): boolean {
    return this.getControl().invalid;
  }
  mustShowError(): boolean {
    const control = this.getControl();
    return control.invalid && (control.dirty || control.touched);
  }
  getErrorMessage(): string {
    const control = this.getControl();
    return JSON.stringify(control.errors);
  }
  private getControl(): AbstractControl {
    return this.form.controls[this.formControlName];
  }
}
