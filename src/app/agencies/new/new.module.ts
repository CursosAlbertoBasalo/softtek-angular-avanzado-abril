import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@stk/shared/shared.module';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';

@NgModule({
  declarations: [NewComponent],
  imports: [CommonModule, NewRoutingModule, SharedModule],
})
export class NewModule {}
