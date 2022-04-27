import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@stk/shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterForm } from './register/register.form';

@NgModule({
  declarations: [RegisterComponent, RegisterForm],
  imports: [CommonModule, RegisterRoutingModule, SharedModule],
})
export class RegisterModule {}
