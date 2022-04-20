import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@stk/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AgenciesList } from './agencies/agencies.list';

@NgModule({
  declarations: [HomeComponent, AgenciesList],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
